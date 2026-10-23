# Interior designer landing page

The supplied brief is the product and visual specification. This is a new single-page site with React and TypeScript, built as static assets for portable hosting.

The first screen pairs a large editorial heading with a dominant warm interior photograph. A restrained header, asymmetrical project grid, spacious service rows, numbered work sequence and quieter personal section create a magazine rhythm. The exact palette is #F4F0E8 / #252422 / #A75B43. Cormorant Garamond and Manrope include Cyrillic and are self hosted.

Project cards open a native accessible dialog with local image galleries, tasks, areas and scope. A native range input controls aligned before/after images with pointer, touch and keyboard. FAQ uses native details elements. The form validates name, email/phone/messenger and property type, then reports an unset endpoint without sending or claiming success. A configured endpoint uses JSON POST, timeout, busy, success and error states. Private personal data is not persisted in the browser.

All editable business content lives in src/site.config.ts. The initial name, project briefs and areas are clearly illustrative; image sources and generation provenance are recorded. There are no fictional awards or testimonials. The demonstration deployment is private and noindex until real content and a canonical domain are configured.

Verification: production TypeScript/build checks; desktop/mobile browser checks for overflow and controls; form unset/error/success behavior; native dialog Escape/focus; range keyboard behavior; reduced motion.
