# QA, accessibility and release checklist

## Responsive viewport matrix
Test at 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1366 and 1440 CSS pixels. Verify no horizontal overflow, clipping, overlap or inaccessible sticky controls.

## Browser/device matrix
- Desktop: current Chrome, Edge, Firefox and Safari.
- Mobile: iOS Safari and Android Chrome on actual devices where possible.
- Tablet: iPad Safari and Android tablet browser.

## Accessibility
- Keyboard-only pass for nav, dialogs, carousels, form, calculators and accordions.
- Visible focus states; 44x44px touch targets.
- Heading order and landmarks validated.
- Labels, error announcements, accessible names and contrast validated.
- Captions/transcripts available for videos.
- Reduced motion supported.

## Functional tests
- BMI calculator: valid, blank, zero, negative, text, decimal, boundary and unit cases.
- Booking: required fields, invalid phone/email, consent, duplicate submit, network failure, success and spam controls.
- Videos: Drive public permission, iframe preview, fallback URL, modal close, keyboard focus and mobile playback.
- Recipes: search, filters, portion adjustment and save persistence.
- Client portal: session handling, invalid credentials, reset, timeout and logout.

## Security and privacy
- No secrets, passwords, private Drive links or health records in source control.
- HTTPS, security headers, input sanitisation, rate limiting and CSRF protection where applicable.
- Consent, retention and third-party embed disclosures approved.
- Demo credentials shown in the supplied screenshot must not be copied into production; rotate them if they were active.

## Performance/SEO
- Images AVIF/WebP, responsive `srcset`, below-fold lazy loading.
- Video iframes instantiated on interaction or lazy-loaded.
- Core Web Vitals monitored.
- Unique title/description, one H1, canonical, sitemap, robots and structured data validated.
