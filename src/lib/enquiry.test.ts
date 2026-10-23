import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry, sendEnquiry } from "./enquiry.ts";

const enquiry = {
  name: "Анна",
  contact: "+7 (999) 123-45-67",
  propertyType: "Квартира",
};
const types = ["Квартира", "Загородный дом", "Другое"];

test("validates missing fields and unknown property types", () => {
  assert.deepEqual(
    Object.keys(
      validateEnquiry(
        { name: " ", contact: "abc", propertyType: "invalid" },
        types,
      ),
    ),
    ["name", "contact", "propertyType"],
  );
});
test("accepts Russian names, email, international phone and Telegram", () => {
  for (const contact of [
    "hello@example.com",
    "+7 (999) 123-45-67",
    "@anna_design",
    "https://t.me/anna_design",
  ]) {
    assert.deepEqual(
      validateEnquiry({ ...enquiry, name: "Анна-Мария", contact }, types),
      {},
    );
  }
});
test("rejects contact overflow, invalid names and short phone", () => {
  assert.ok(validateEnquiry({ ...enquiry, contact: "1234" }, types).contact);
  assert.ok(
    validateEnquiry(
      { ...enquiry, contact: "x".repeat(151) + "@example.com" },
      types,
    ).contact,
  );
  assert.ok(validateEnquiry({ ...enquiry, name: "12" }, types).name);
});
test("unset endpoint never sends a request or reports success", async () => {
  let calls = 0;
  const result = await sendEnquiry(enquiry, "", 100, async () => {
    calls++;
    throw new Error();
  });
  assert.equal(calls, 0);
  assert.equal(result.state, "unavailable");
});
test("only explicit server acknowledgement is success", async () => {
  let payload: unknown;
  const result = await sendEnquiry(
    { ...enquiry, name: " Анна " },
    "/api/enquiries",
    100,
    async (_url, init) => {
      payload = JSON.parse(init?.body as string);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    },
  );
  assert.equal(result.state, "success");
  assert.deepEqual(payload, { ...enquiry, source: "interior-website" });
  const unconfirmed = await sendEnquiry(
    enquiry,
    "/api/enquiries",
    100,
    async () => new Response("{}"),
  );
  assert.equal(unconfirmed.state, "error");
});
test("handles network, HTTP and non-JSON errors without mutating input", async () => {
  for (const request of [
    async () => {
      throw new TypeError("network");
    },
    async () => new Response("down", { status: 500 }),
    async () => new Response("<html>"),
  ]) {
    const result = await sendEnquiry(enquiry, "/api/enquiries", 100, request);
    assert.equal(result.state, "error");
  }
  assert.equal(enquiry.name, "Анна");
});
test("timeout aborts pending requests and permits retry", async () => {
  const result = await sendEnquiry(
    enquiry,
    "/api/enquiries",
    5,
    (_url, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new Error("aborted")),
        );
      }),
  );
  assert.equal(result.state, "error");
  assert.match(result.message, /вовремя/);
});
test("rejects unsafe endpoint configuration", async () => {
  let called = false;
  const result = await sendEnquiry(
    enquiry,
    "javascript:alert(1)",
    100,
    async () => {
      called = true;
      return new Response("{}");
    },
  );
  assert.equal(called, false);
  assert.equal(result.state, "error");
});
