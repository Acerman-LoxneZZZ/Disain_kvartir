---
name: "Анна Власова — interior design demo"
description: "An architectural magazine world for a Russian-language interior design portfolio."
colors:
  paper: "#f4f0e8"
  ink: "#252422"
  accent: "#a75b43"
  muted: "#6a645d"
  line: "#d6d0c6"
  comparison-surface: "#eae5dc"
  contact-surface: "#e8e0d5"
  field-line: "#bdb2a4"
  field-placeholder: "#71695f"
  field-error: "#9c3928"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(52px, 5.6vw, 92px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(40px, 4.2vw, 66px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.038em"
  project-title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  service-title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  text-link:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.6
  navigation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  square: "0"
  circle: "50%"
spacing:
  page-inset-desktop: "56px"
  page-inset-tablet: "36px"
  page-inset-mobile: "20px"
  page-inset-narrow: "16px"
  section-desktop: "100px"
  section-tablet: "80px"
  section-mobile: "64px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "18px 23px"
    width: "100%"
  button-dark-hover:
    backgroundColor: "{colors.accent}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.text-link}"
    padding: "0 0 10px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    width: "44px"
    height: "44px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 0 15px"
    width: "100%"
  navigation-link:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "14px 0"
  project-filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "11px 0"
  project-filter-selected:
    textColor: "{colors.ink}"
  project-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0"
    width: "100%"
  comparison-handle:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "54px"
    height: "54px"
---

# Design System: Анна Власова — interior design demo

## Overview

**Creative North Star: "Architectural magazine"**

The user-pinned architectural magazine world pairs warm paper and graphite with restrained terracotta. Cyrillic Cormorant Garamond provides the expressive voice; Manrope keeps navigation, descriptions and forms quiet and practical. Large interior photographs, open margins and fine rules carry the composition.

Photography supplies the material richness: timber, daylight, stone and spatial depth. The interface stays flat and precise around it. This record describes the implemented responsive landing page; the name, portfolio and AI assets remain visibly illustrative, with no awards or testimonials presented as proof.

**Key Characteristics:**

- Warm paper, graphite and a single terracotta accent.
- Cyrillic serif headlines with italic emphasis; restrained sans-serif utility text.
- Large rectangular photography and deliberately unequal image sizes.
- Fine dividers, square fields and circular controls only where the interaction calls for them.
- Gentle motion with visible content by default and a reduced-motion alternative.

## Colors

The palette reads as warm paper, dark printed type and a terracotta annotation.

### Primary

- **Terracotta** (`accent`): italic emphasis, arrows, the header enquiry link, hover responses, focus outlines and the scroll-progress line. The dark form button becomes terracotta on hover.

### Neutral

- **Warm milk paper** (`paper`): page canvas, dialog, image-overlay controls and selected text foreground.
- **Graphite** (`ink`): primary text, the resting form button and selected filter underline.
- **Warm gray** (`muted`): supporting copy, metadata and disclosure text.
- **Paper rule** (`line`): header, section, accordion, signature and footer divisions.
- **Comparison wash** (`comparison-surface`): the full-width before/after section.
- **Contact wash** (`contact-surface`): the warmer enquiry section.
- **Field rule / placeholder / error** (`field-line`, `field-placeholder`, `field-error`): form-only roles. Error text and the invalid field underline share the error color; written messages communicate the state as well.

The source also uses translucent graphite for the photographic caption scrim, dialog backdrop and mobile-menu shadow. These are functional overlays, not additional brand accents. Image loading surfaces are local neutral fills rather than a reusable color scale. The sidecar's tonal ramps are synthesized preview metadata; the page does not implement those ramps as tokens.

**The Accent as Emphasis Rule.** Use terracotta for italic emphasis, directional cues, interactive feedback and focus. Keep the broad reading surfaces warm and neutral.

## Typography

**Display Font:** Cormorant Garamond, with Georgia and serif fallbacks.  
**Body Font:** Manrope, with a sans-serif fallback.

The high-contrast serif and warm italic feel editorial and personal. The sans-serif supports scanning without competing with the rooms. Both font families serve Cyrillic content in the shipped site.

### Hierarchy

- **Display:** the frontmatter's desktop hero role. The large-screen override is (96px) at a minimum viewport width of (1650px). At (1200px) and below it becomes (5.5vw), at (900px) and below (8vw), at (700px) and below `clamp(39px, 9.7vw, 66px)` with line-height (1.01), and at (370px) and below (37px).
- **Headline:** the shared section-heading role. Individual comparison, services, process, about, FAQ and contact headings have source-specific sizes; retain those local compositions rather than forcing every heading to the same dimensions. The common mobile section heading is (42px) with line-height (1.03).
- **Project title / service title:** the two extracted serif title roles. Project titles reduce at intermediate widths, then use (29px) on mobile; services use (27px) on mobile. Other editorial statements use the same serif family and regular weight.
- **Body:** the extracted role describes the hero introduction. Most explanatory paragraphs use (13–14px), with line-height between (1.8) and (1.95) according to context. The source uses short local measures such as (305px), (330px), (380px) and (470px); there is no global character-width token.
- **Text link / navigation:** the extracted utility roles. Local links and navigation reduce on smaller screens. Wordmark capitals and supporting metadata have their own component-specific sizing; these small values are not a general text-size floor.
- **Form:** labels use (11px) and weight (500); desktop field text uses (14px), rising to (16px) on mobile. Error text is (11px), and action text is (13px).

**The Two Voices Rule.** Use Cormorant Garamond for expressive headings and editorial statements; use Manrope for navigation, explanatory copy, metadata and form controls.

## Layout

The shared content container has a maximum width of (1536px). The frontmatter's page-inset tokens describe the actual side margins: desktop, then (1200px), (700px) and (370px) maximum-width overrides. The shared section rhythm uses the documented desktop, tablet and mobile spacing; introductory, comparison and contact sections retain their observed local padding. The document uses `scrollbar-gutter: stable` so the content width remains stable when a project dialog locks body scrolling.

The wide hero aligns a large headline with a narrow introduction column (260px); above (1650px) the introduction becomes (300px). At (900px) and below the title and introduction stack, and at (700px) the introduction itself becomes a vertical block. The photograph uses a desktop height of `clamp(420px, 44vw, 680px)`, then (520px) at the tablet breakpoint and (480px) on mobile. It bleeds to the viewport edges on mobile, with a (430px) height on the narrowest breakpoint. Preserve its focal point when changing crops.

The project gallery uses unequal columns (1.2fr / 0.8fr), a horizontal gap of (7.5%) and a vertical gap of (64px). The second project is offset downward and the third uses a narrower image. Mobile changes to a vertical sequence while preserving unequal widths and alignment: the second project is (82%) wide and right-aligned; the third is (94%) wide. Filtering resets these offsets and widths.

Services, FAQ, about and contact use paired columns on larger screens and stack at (700px). The process list uses four columns, then two on mobile. The before/after frame changes from aspect ratio (1.9) to (0.96) on mobile and also bleeds to the viewport edge. A project dialog uses a maximum width of (1100px), viewport-bounded height and its own scrolling; mobile brings it to within (10px) of each side.

Responsive CSS boundaries are (1650px minimum), and (1200px), (900px), (700px), (370px maximum). These are the implemented layout breakpoints; image source-size hints are not additional layout tokens.

## Elevation & Depth

The page is flat at rest. Photographic perspective, warm tonal sections, fine rules and spacing separate content. The hero image alone has a lower graphite gradient ending at `rgba(37, 36, 34, 0.9)` to support its white caption. The native dialog uses a translucent graphite backdrop with (5px) blur. There are no lifted content-card shadows.

### Shadow Vocabulary

- **Mobile navigation overlay:** `0 20px 30px -25px #25242240`; an understated separation below the opened mobile menu.
- **Comparison focus ring:** `0 0 0 4px var(--accent)`; an interaction ring around the handle when the native range has focus, not ambient elevation.

**The Flat Surface Rule.** Let photography and tonal section changes create depth. Keep content cards unboxed; reserve the existing shadow for the mobile navigation overlay and the comparison ring for keyboard focus.

## Shapes

Images, content regions, buttons, dialogs and form fields use straight edges. Inputs explicitly set their radius to the frontmatter's square token. The circular token belongs to the hero scroll affordance and comparison handle. The comparison handle is (54px) across on desktop and (48px) on mobile; the hero scroll affordance is (48px), then (42px).

Dividers are fine (1px) rules. Forms use an underline rather than a surrounding box. Photo crops are rectangular and deliberately vary in proportion. Do not infer a rounded-card system from the two circular controls.

## Components

### Buttons and text links

The full-width enquiry button uses graphite over paper-colored text, the extracted padding, a minimum height of (58px) and a right-hand SVG arrow. Hover changes its background to terracotta over (0.2s). During a real request, its disabled state uses opacity (0.65), a wait cursor and a spinner.

Text links are open, underlined actions with a separated SVG arrow. Hover changes the text to terracotta and moves the arrow by (3px, -3px) using the shared easing. The source's global keyboard focus treatment is a (2px) terracotta outline offset by (6px). Icon buttons have a (44px) target, no filled resting background and a translucent graphite hover fill.

### Project filters

Filters are text controls rather than pills. Unselected labels use muted text; selection uses graphite text with a (1px) underline. Hover uses terracotta. Each button exposes its pressed state. Mobile gives the filter controls a minimum height of (44px).

### Project cards and gallery dialog

A project card is a transparent button containing an unframed image and a separate caption. Captions pair a serif project title and small category/location text with area and an arrow. On desktop, hover and keyboard focus gently scale the image to (1.035) and reveal a paper-colored action strip. The strip is omitted on mobile; the entire card remains the open action.

The native project dialog carries a paper background and graphite text. A close button aligned to the right, arrow controls and selectable thumbnails support the gallery; the active thumbnail uses a terracotta border and full opacity. Left/right keys change images, Escape closes the native dialog, and focus returns to the opening card. The task and scope content uses fine dividers and the same serif/sans-serif hierarchy. Illustrative-project disclosure remains part of the dialog content.

### Inputs and form feedback

Fields are transparent, square and full width with a single warm-gray underline. Labels stay above the input; placeholder text does not replace a label. The source uses minimum field height (48px), an accent caret and a focus outline offset by (4px). Invalid fields change the underline to the field-error role and show a linked error message. Form results use a lightly translucent paper fill and a fine border.

The unset endpoint is disclosed before the action. This demonstration must not present a fabricated success. Direct contact placeholders and the privacy-policy setup notice stay legible until real owner details are supplied.

### Navigation

The header is a restrained nameplate with text navigation and an underlined terracotta enquiry action. The action disappears at (900px); at (700px) the desktop links are replaced by a (44px) menu control. The opened menu is a paper panel with large serif links, thin rules, small directional SVGs and the restrained overlay shadow. Escape closes it and returns focus to the toggle; choosing a section closes the panel. A focus-revealed skip link precedes the header.

### Services and FAQ

Native `details` / `summary` accordions use thin top rules, an open text surface and a terracotta plus SVG. The icon rotates (45deg) when expanded. Service summaries use serif titles and a short visible description; FAQ summaries use Manrope. Expanded details retain muted body text and the existing paragraph measures.

### Before/after comparison

The signature interaction overlays an illustrative unfinished room on the aligned furnished photograph. A native, full-frame range input changes the clipped area; its initial position is (48%). Paper labels identify both sides, while a fine vertical rule and circular handle show the split. Pointer, touch and arrow-key interaction use the same control. Focus outlines the frame and rings the handle. Keep the help text and AI/illustrative disclosure beside it.

### Motion

The shared ease is `cubic-bezier(0.16, 1, 0.3, 1)`. Initial title entrance lasts (1s), photo reveal (1.4s) and photo settle (1.7s). Visible scroll sections receive a short entrance (0.85s); content is visible by default because the final source override removes the earlier hidden resting state. Image hover zoom lasts (1s), with an action-strip entrance of (0.4s). A thin fixed progress rule reflects ordinary page scrolling; it does not intercept scrolling.

The reduced-motion media query removes animation and transitions, keeps text and photographs visible, and leaves ordinary scrolling intact. The sidecar records these extensions because the frontmatter schema does not carry motion or breakpoints.

## Do's and Don'ts

### Do:

- **Do** preserve the paper, graphite and terracotta roles established in the frontmatter.
- **Do** keep serif italic emphasis selective and pair it with quiet Manrope utility text.
- **Do** use real architectural photography with rectangular crops and deliberate asymmetry.
- **Do** retain visible focus, native keyboard interaction and the reduced-motion alternative.
- **Do** keep demonstration and AI disclosures visible beside the content they qualify.

### Don't:

- **Don't** add awards, testimonials or achievements without real supplied evidence.
- **Don't** replace the photography-led world with ornamental cards, decorative gradients or repeated rounded containers.
- **Don't** turn the circular comparison and scroll controls into a general corner treatment.
- **Don't** hide essential content behind an animation or require hover to open a project.
- **Don't** show a successful enquiry state while the endpoint is unset.

