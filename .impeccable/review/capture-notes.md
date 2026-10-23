# Capture notes

Full-page captures were made with the in-app browser viewport override at desktop 1440×1000 CSS px and mobile 390×844 CSS px. Fonts were loaded, scrollY was zero, range was 48%, form blank. Screenshots omit the reserved 8px scrollbar strip.

The in-app browser's viewport-only screenshot path scales the image slightly differently from its full-page path. To provide consistent evidence, outputs/preview-desktop.png and preview-mobile.png are unmodified top-of-page crops of the corresponding full-page screenshots (1000 and 844 image pixels tall). They show the same captured state and are not separate viewport renders.

The initial evidence showed different line wrapping when the full-page capture temporarily hid the scrollbar. CSS scrollbar-gutter:stable now preserves content width during that operation and when project dialogs open. The final mobile heading has three lines in both the preview crop and full-page capture. No website content was composited or retouched.
