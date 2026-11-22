# NutriSlims - Complete Website Redesign
## Developer handoff specification (Desktop + Mobile)

**Package version:** 1.0  
**Prepared:** 22 November 2026  
**Project:** NutriSlims Health & Wellness Clinic  
**Reference source:** six-page screenshot of the current website supplied in this conversation, plus the user-provided redesign direction and three Google Drive video links.

> This is a developer-ready design and functional specification with starter assets and a responsive HTML prototype. It is not a production deployment and does not replace clinical, legal, privacy, accessibility or content approval.

---

## 1. Product objective

Redesign the complete NutriSlims website as a premium, trustworthy, mobile-first nutrition and wellness experience that helps visitors:
1. Understand the clinic and the services offered.
2. Learn about the dietitian and the clinic's approach.
3. Explore nutrition programs, recipes, educational videos and health calculators.
4. Review verified clinic feedback and consented patient stories.
5. Book an in-person or online consultation or start a WhatsApp conversation.
6. Access the client portal securely.

The website must not imply guaranteed medical outcomes. It must clearly distinguish general nutrition education from diagnosis or treatment.

## 2. Source-derived content inventory

The supplied six-page current-site capture contains the following content. Retain these topics in the redesign unless the clinic owner approves a content change:

### Clinic and contact information shown in the source capture
- Clinic identity: Nutrislims / NutriSlims Health & Wellness Clinic.
- Location displayed: 1st Floor, B-109, Rajendra Nagar Main Road (Near Jain Temple), Indore, Madhya Pradesh 452012.
- Phone displayed: 07828491478 / +91 78284 91478.
- Email displayed: info@nutrislims.com.
- Source header hours appear as Monday-Saturday, 9:00 AM-8:00 PM. **Confirm actual opening hours with the clinic and Google Business Profile before publishing.**

### Six core programs/services shown in the source capture
1. Weight Management / Weight Loss & Weight Gain.
2. Diabetes Lifestyle Management.
3. PCOS / PCOD Recovery / Nutrition.
4. Pre & Post Pregnancy Care.
5. Child Growth & Nutrition.
6. Corporate Wellness.

### Dietitian profile content shown in the source capture
- Dietitian Oshin Ambekar.
- The source page lists M.Sc. Public Health - Brunel University London.
- The source page also lists a clinical dietitian/diabetes educator description and memberships/recognitions. **Confirm current exact credentials, awarding bodies, membership status and permission to display each badge before publication.**
- Positioning in the redesign: practical, personalised, sustainable nutrition guidance; avoid starvation diets, extreme claims or one-size-fits-all meal plans.

### Clinic framework shown in the source capture
- Metabolic profiling.
- Customised meal maps / personalised meal planning.
- Continuous adjustment / regular progress reviews.

### Testimonials and outcomes shown in the source capture
- Before/after weight and HbA1c comparison cards are present in the current page. These must only be reused with written patient consent, source records, date range, context and clinical review. Do not imply typical or guaranteed results.
- Review counts, patient totals, success rates and outcome percentages appear inconsistent across the source pages and related public listing. Do not hard-code any of these figures until reconciled against current source records.

### Tools/calculators shown in the source capture
- Advanced BMI.
- BMR Harris-Benedict.
- TDEE & Activity.
- Body Fat (US Navy).
- Daily Water Intake.
- Macro Nutrient Split.
- Ideal Body Weight.
- Waist-to-Hip Ratio.
- PCOS Symptom Screener.
- Diabetes Risk Index.
- Heart Rate Zones.
- Calorie Burn Estimator.
- Vitamin Deficiency Screener.

Each tool requires an approved formula, clear input/output definitions, units, limitations and a clinical review. A screening score is not a diagnosis.

### Recipe explorer shown in the source capture
The captured page shows the following sample meal cards:
- Overnight Oats & Chia Seeds Bowl.
- Diabetic-Friendly Quinoa Khichdi.
- PCOS-Approved Paneer Tikka Salad.
- High-Protein Salmon/Tofu Stir Fry.

The capture shows time, calories, macronutrients, ingredients, portion controls and Save. Verify every recipe's nutrient calculation and medical suitability before publishing labels such as "diabetic-friendly" or "PCOS-approved".

### Other source-page features
- Intermittent Fasting tracker.
- Dietary Substitution Engine.
- Client Portal login.
- FAQ accordion.
- Email newsletter.
- Contact/footer with clinic details and social links.

**Security note:** the supplied screenshot shows demo portal credentials. Do not reproduce them in this package or the production UI. Rotate any exposed demo password and implement server-side authentication.

---

## 3. Information architecture / sitemap

### Global navigation (desktop)
- Home
- Services (dropdown with six services)
- Programs (program landing pages; can share content with services where appropriate)
- Health Calculators
- Recipes
- Videos
- About
- Contact
- Search icon
- Book Consultation (primary CTA)
- Client Portal (utility link; can be placed in header utility region/footer)

### Mobile navigation
- Brand mark and wordmark.
- Menu button opens a full-height or side drawer.
- Persistent quick actions at bottom: Call, WhatsApp, Book.
- Drawer order: Home, Services, Programs, Health Calculators, Recipes, Videos, About, Contact, Client Portal.
- Escape closes drawer; background scroll is locked while drawer is open; focus remains within drawer.

### Recommended pages
1. `/` Home.
2. `/services/` Services overview.
3. `/services/weight-management/`.
4. `/services/diabetes-lifestyle/`.
5. `/services/pcos-pcod/`.
6. `/services/pregnancy-nutrition/`.
7. `/services/child-nutrition/`.
8. `/services/corporate-wellness/`.
9. `/programs/` Program overview.
10. `/about/` Dietitian and clinic approach.
11. `/calculators/` Health calculators hub.
12. `/recipes/` Recipe explorer.
13. `/videos/` Video/education library.
14. `/reviews/` Reviews and testimonials.
15. `/book-consultation/` Booking request.
16. `/client-portal/` Secure portal.
17. `/faq/` FAQ.
18. `/privacy-policy/`, `/terms/`, `/medical-disclaimer/`, `/cookie-policy/`.

---

## 4. Visual design system

### Brand direction
- Feeling: fresh, calm, clinically responsible, supportive, evidence-informed and approachable.
- Use generous white space, natural food photography, softly tinted service cards and a restrained leaf motif.
- Avoid overusing gradients, excessive shadows, decorative badges or stock medical imagery.
- The new layout should look like a modern clinic website, not a generic diet product landing page.

### Working colour tokens
See `design/tokens.json` and `design/tokens.css`.
- Primary green: `#2E7D32`.
- Dark green: `#175B2A`.
- Light green: `#70A943`.
- Accent amber: `#F59E0B`.
- Success: `#168A4A`.
- Background: `#F7FAF5`.
- Surface: `#FFFFFF`.
- Soft surface: `#EEF6E8`.
- Main text: `#17231B`.
- Muted text: `#667568`.
- Border: `#DCE6D7`.

These are proposed working colours, not extracted official brand specifications. Replace with the approved logo/brand kit if supplied.

### Typography
- Headings: Poppins 600-800.
- Body/UI: Inter 400-600.
- Base body size 16px desktop and mobile; do not reduce body text to fit a card.
- Body line-height 1.55-1.7.
- H1 desktop 48-56px; mobile 34-38px.
- H2 desktop 34-40px; mobile 28-32px.
- H3 desktop 22-26px; mobile 20-23px.
- Use fluid scaling with `clamp()`.
- Bundle licensed/self-hosted web fonts or use Google Fonts only after privacy/performance review.

### Spacing, shape and elevation
- 4px base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 88.
- Max content width: 1280px.
- Desktop gutters: 32px; tablet: 24px; mobile: 16px.
- Card radius: 16-20px; buttons: pill/999px or 12px where appropriate.
- Use subtle card shadow only for cards that need elevation; rely on borders and background contrast for the rest.
- Section vertical spacing: 80-96px desktop; 44-56px mobile.

---

## 5. Home page section-by-section specification

### 5.1 Utility bar
**Desktop:** thin dark-green strip above main nav. Left: location and opening-hour link; centre/right: phone and email; far right: social icons. 12-13px text. Each item must be a clickable, semantic link.

**Mobile:** hide nonessential utility details from the bar; retain a compact phone/WhatsApp shortcut or show contact information in the menu. Do not force a tiny multi-line top bar.

**Data:** use one central clinic settings record for address, phone, email, opening hours and social URLs.

### 5.2 Header/navigation
**Desktop:** sticky header, white surface, approved logo left, nav centred, search and Book Consultation right. Header height 72-84px. On scroll, apply subtle border/shadow and slightly compact height.

**Mobile:** 60-68px header with logo, menu, optional call/booking icon. Do not display every nav link inline.

**Interactions:** dropdown opens on click and keyboard; current page has an accessible active state; search opens a search panel/modal; all controls are keyboard operable.

### 5.3 Hero + Quick BMI Check
**Desktop layout:** two-column hero, approximately 55/45. Left includes eyebrow, benefit-oriented headline, short description and two CTAs (Book Consultation, WhatsApp). Right uses a food/meal photograph and a quick BMI card layered within the hero. A trust/metrics strip can follow below.

**Mobile:** stack text, CTA row, hero image, then BMI card. Use full-width buttons and avoid text overlay on busy imagery. Ensure hero and BMI do not occupy the entire first screen before services are visible.

**BMI interaction:** fields: weight (kg), height (cm). Validate positive finite numbers and reasonable field bounds. Calculate BMI = weightKg / (heightM * heightM). Display numeric result to one decimal place. Add a clear note: BMI is a broad screening measure and does not diagnose health status. The category bands must be clinically reviewed for the intended population and context before display. No personalised medical advice from the calculator.

### 5.4 Trust/clinic facts strip
Use verified credentials or factual service facts only. Do not render arbitrary client totals, success percentages, review counts or years of experience. If unverified, replace with neutral trust points such as "Personalised plans", "Progress reviews", "In-person and online consultations" only if operationally true.

### 5.5 Services and programs
Six equal desktop cards in one row at large view or 3x2 grid if text length needs space. Each has one icon/image, service name, 1-2 sentence description and a clear link. On tablet: 2 columns. On mobile: 1 column or horizontal snap carousel with accessible previous/next controls; prefer stacked list if card copy is longer.

Use the six service names in source inventory. Each service detail page should use consistent content structure:
- Who the service is for (careful, non-diagnostic wording).
- What consultation includes.
- Assessment process.
- Example of support offered.
- What to prepare for first consultation.
- CTA to book.
- FAQ.
- Medical disclaimer.

### 5.6 Dietitian profile
Desktop: portrait image left, profile content centre/right, optional framework card adjacent. Include name, approved credentials and short professional approach. Mobile: portrait first, then profile summary and expandable credentials. Provide a full About page link.

Only use a real, approved portrait of the dietitian. The generated assets in this package are illustrative and must not be represented as the real clinician.

### 5.7 Clinic approach / care process
Four-step horizontal process on desktop: Assess -> Personalise -> Monitor -> Adjust. Mobile: vertical numbered steps or 2x2 tiles. Copy should be concise. State expected contact/check-in cadence only if confirmed operationally.

### 5.8 Assessment services and calculator hub preview
Show 6-8 top tools, plus "Explore all calculators". On mobile, use 2-column tiles or a scrollable chip row. The full page includes all tools from the source inventory, with individual tool explanations and clinical validation.

### 5.9 Healthy recipe explorer
Desktop: filter bar and 3-4 recipe cards with image, title, prep time, calories, macros and Save. Mobile: stacked cards or horizontal carousel; ingredients expand on tap. Filters: All, Weight Management, Diabetes-conscious, PCOS-related, High Protein, Vegetarian, Vegan (only where tagged accurately). Search by recipe name/ingredient.

Serving controls must recalculate ingredient amounts and, where possible, nutrition estimates. Save requires authenticated user state or local anonymous save with explicit notice; do not show a misleading saved state if no persistence exists.

### 5.10 Video gallery - three supplied Google Drive videos
Section heading: `Watch. Learn. Eat Better.`
Intro: short practical videos on nutrition, recipes and clinic education. Do not assign content-specific titles until each supplied clip is reviewed.
Desktop: 3 vertical cards in a row (9:16 poster/player frame), rounded corners, title, short caption and play button. Optional 4th card may link to Instagram once available.
Tablet: 2 columns; mobile: one card per viewport in a swipe carousel or vertical stack.

Use `videos/videos.json`. The three links were supplied by the user. For embed, use each `embed_url` ending in `/preview`. Show a Drive fallback link. Set iframe `loading="lazy"`, descriptive `title`, `allowfullscreen`, and an explicit aspect ratio. Do not autoplay with sound. Add captions/transcripts when available.

**Permissions:** each Drive file must be shared as `Anyone with the link - Viewer` for public embedding, or moved to a media provider with public/private playback. Confirm permission in an incognito browser. A private Drive file will not embed for public visitors.

### 5.11 Google Reviews and patient stories
Separate real Google reviews from clinic-authored patient case studies. Use Google Business Profile/approved API or official embed/link where feasible. Do not scrape or fabricate reviews. Display reviewer name only as published by Google and in line with platform rules. Include "Read all reviews" and "Write a review" links only after verifying correct listing URLs.

Patient stories require written informed consent, before/after image consent, source records, dates and contextual disclaimer. Never show a promised outcome or a guaranteed weight-loss figure. If consent/data is unavailable, use anonymous general feedback only when permission exists, or hide the section.

### 5.12 Featured program panels
Promote 1-2 current programs with audience, inclusions, delivery method and CTA. Avoid guaranteed claims such as "4-7 kg in 30-45 days" or outcome percentages unless they have documented substantiation, appropriate context and clinical/legal approval. Better copy: "A personalised plan with regular progress reviews".

### 5.13 Consultation booking
Fields: Full name, mobile number, email (optional/required per workflow), primary goal/service, preferred consultation mode (in-clinic/online), preferred date/time (optional), consent checkbox. Add server-side validation, spam prevention and confirmation state.

On submit: create a secure booking enquiry via backend/CRM; send user confirmation and notify clinic staff; do not rely on a `mailto:` link as the only submission path. If WhatsApp is the chosen path, construct a prefilled message and open `https://wa.me/917828491478` after explicit click. Phone link uses `tel:+917828491478`.

### 5.14 FAQ, newsletter and footer
FAQ: 5-8 high priority questions, keyboard accessible accordion. Newsletter: email validation, consent statement, unsubscribe link and a configured email platform. Footer: logo, short clinic description, navigation, services, verified address/hours, phone/email, social links, privacy/terms/medical disclaimer. Include map only after confirming map place ID/location.

---

## 6. Desktop/tablet/mobile responsive behaviour

### Breakpoints
- Mobile: <=767px.
- Tablet: 768-1199px.
- Desktop: >=1200px.
- Use CSS Grid/Flexbox and content-driven breakpoints rather than device-specific hard coding.

### Desktop (>=1200px)
- Max content width 1280px centred.
- 12-column grid; main page section content should align to common container edges.
- Hero 2-column; services 3x2 or 6 across only if cards remain readable; video gallery 3-up; reviews 3-up; calculator page sidebar + workspace.
- Use sticky header but avoid sticky elements obscuring anchors.
- Hover interactions are subtle and must have keyboard focus equivalents.

### Tablet (768-1199px)
- 8-column or 2-column adaptable layout.
- Services 2-3 columns based on width; video/review cards 2 columns.
- Collapse desktop nav to tablet menu at a tested width; do not wait until content overlaps.
- BMI widget may sit beneath hero image or beside copy only if there is adequate width.

### Mobile (<=767px)
- Single-column default, 16px side gutters.
- 44x44px minimum target size for major interactive controls.
- Header 60-68px.
- Bottom action bar fixed with Call, WhatsApp, Book; safe-area padding for iOS. Ensure it does not cover form submit buttons or footer content; add bottom padding to page.
- No horizontal page overflow. Horizontal carousels must have clear snap points, keyboard-accessible controls and visible partial next card.
- Tables become stacked cards or horizontally scrollable within their own container.
- Form fields 100% width, labels always visible, correct mobile keyboards (`tel`, `email`, `number`).
- Images have fixed aspect ratios, `object-fit:cover`, responsive sources and alt text.
- Respect `prefers-reduced-motion`; do not make important content depend on animation.

---

## 7. Functional requirements

### Global
- Accessible navigation, routes, breadcrumbs (on inner pages), search, contact links, CTA tracking and page not-found state.
- Centralised content management for services, recipe content, FAQs, videos, clinic contact, hours, credentials, reviews and testimonials.
- Server-side form processing; validation and rate limiting.
- Consent management for analytics/marketing cookies as required by target jurisdiction.
- Secure headers, HTTPS, input sanitisation, CSRF protection where applicable, secure secrets and no credentials in frontend bundles.

### BMI calculator
- Unit selector can be considered for metric/imperial; source UI uses metric.
- Validate height and weight; prevent division by zero and unreasonable entries.
- Output only BMI value/category with limitation note; never diagnose.
- Unit tests for formula, empty fields, zero, negative, string injection and boundary values.

### Calculators
- Each calculator has own validated function, input unit labels, output units and formula reference.
- Version formulas and date reviewed by a qualified person.
- Avoid collect/store of sensitive personal health details unless strictly needed, consented and secured.
- Show "educational estimate, not diagnosis" where relevant.

### Recipe explorer
- Data-driven recipe collection; recipe detail view; search/filter; sort; portion scaling; nutrition display; accessible save.
- Nutrition values must trace to recipe data source/calculation and include serving size.

### Video gallery
- Source URLs from videos.json; Drive sharing state check before release.
- Lazy-load iframe only after user intent if performance/privacy policy requires click-to-load.
- Player should have accessible title, close control, Escape handling and focus return if modal is used.
- Fallback link to Drive file.

### Booking
- Field-level validation and clear error messages.
- Prevent duplicate submissions, show pending/success/error states.
- Backend API/CRM destination must be configured by the project team.
- Consent checkbox must not be preselected.

### Client portal
- Real auth provider, server-side session and least-privilege authorisation.
- Password reset, MFA where supported, rate limiting, audit trail and logout.
- No demo usernames/passwords in source code or screenshots.

---

## 8. Content, clinical and privacy safeguards

- All claims about credentials, memberships, reviews, patient counts, success rates and outcomes require verification.
- Confirm opening hours, contact information, service availability, online/in-person scope and service descriptions.
- Health calculators and screeners need clinical review and disclaimers; screening is not diagnosis.
- Avoid terms like "cure", "reverse", "guaranteed", "approved" and fixed outcome promises unless professionally and legally approved for the actual evidence.
- Obtain written consent for identifiable patient stories, images, quotes and health outcomes.
- Do not expose client portal demo credentials; rotate any credentials visible in screenshots.
- Publish a privacy policy covering enquiry data, health information, analytics, cookies, retention, access/deletion and third-party embeds.
- Provide medical disclaimer and emergency guidance; the website is not an emergency or diagnostic service.

---

## 9. SEO, performance and accessibility

### SEO
- Unique title and meta description per page; one H1; logical H2/H3 structure.
- Descriptive URLs; canonical tags; XML sitemap; robots.txt; Open Graph/Twitter metadata.
- Local SEO: consistent NAP (name/address/phone), hours, service areas, Google Business Profile link and LocalBusiness/HealthAndBeautyBusiness schema only with verified fields.
- Service pages need unique helpful copy, clinician-reviewed content, sources for health claims and internal links.
- Recipe schema only if recipe fields are complete and accurate. VideoObject only when actual titles, thumbnails, descriptions, duration and upload dates are known.

### Performance
- AVIF/WebP images with responsive `srcset`; lazy-load below-fold assets.
- Prefer self-hosted optimized images and fonts; avoid loading all Google Drive iframes immediately.
- Use poster images then instantiate player after user interaction.
- Minify CSS/JS; defer noncritical scripts; cache static assets; monitor Core Web Vitals.
- Target LCP <=2.5s, INP <=200ms and CLS <=0.1 under representative test conditions.

### Accessibility
- WCAG 2.2 AA target.
- Visible keyboard focus, semantic landmarks, labelled inputs, accessible names for icon buttons, contrast compliant text, keyboard-accessible menus/accordions/carousels.
- Captions for videos; alt text for meaningful imagery; decorative imagery uses empty alt.
- Errors announced to assistive technology; no colour-only state communication.

---

## 10. Suggested implementation architecture

The prototype in `prototype/` is a static HTML/CSS/JS starter and can be adapted to the chosen production framework. Recommended component boundaries:
- `SiteHeader`, `MobileNavDrawer`, `StickyMobileActions`.
- `HeroSection`, `QuickBmiCalculator`, `TrustFacts`.
- `ServiceCard`, `ServiceGrid`, `DietitianProfile`, `CareProcess`.
- `CalculatorCard`, `RecipeCard`, `RecipeFilters`, `PortionSelector`.
- `VideoCard`, `VideoPlayerModal`, `GoogleReviewCard`, `PatientStoryCard`.
- `BookingForm`, `FaqAccordion`, `NewsletterForm`, `SiteFooter`.

Recommended data models (minimum):
- `ClinicSettings`: name, address, phone, email, hours, mapUrl, socialLinks.
- `Service`: slug, title, shortDescription, heroImage, inclusions, audience, CTA.
- `Video`: id, title, description, driveFileId, shareUrl, embedUrl, poster, duration, captionFile, publishState.
- `Recipe`: id, title, categoryTags, image, prepMinutes, servings, ingredients, nutritionPerServing, method, reviewStatus.
- `Review`: providerId, publishedName, rating, reviewText, reviewDate, sourceUrl.
- `BookingEnquiry`: name, phone, email, service, mode, preferredDate, consent, status.

---

## 11. Acceptance criteria / definition of done

1. All sitemap routes exist and navigation works on desktop, tablet and mobile.
2. No horizontal page overflow at 320px, 375px, 390px, 768px, 1024px, 1280px and 1440px viewport widths.
3. All CTAs have real destinations/actions; no dead buttons.
4. BMI calculator outputs correct value for test cases and handles invalid input.
5. All three video URLs are loaded from videos.json; public embed permission verified, Drive fallback available.
6. Videos do not autoplay with sound; mobile playback tested on iOS and Android browsers.
7. Booking form validates, sends to configured backend and shows error/success status.
8. Client portal uses secure real authentication; no demo credentials shipped.
9. Service, clinic, clinician and outcome claims reviewed and signed off.
10. Review content sourced from the correct Google listing; no fabricated quotes or counts.
11. Keyboard-only navigation, screen-reader labels, focus management and colour contrast tested.
12. Images optimised; all meaningful images have alt text; page performance measured.
13. SEO metadata, sitemap, robots, canonical and schema validated.
14. Privacy, terms, cookie and medical-disclaimer pages approved and linked.
15. Production content has owner approval; placeholders are removed.

---

## 12. Open items that require clinic-owner confirmation

- Approved official logo file (SVG preferred) and final brand colour/font system.
- Confirmed clinic opening hours and exact NAP details.
- Confirm credentials, membership/award badges and years of practice.
- Confirm whether each service is currently offered and online/in-person availability.
- Correct Google Business Profile URL and review integration method.
- Patient story consent and evidence for any outcome claims.
- Actual content/title/caption/thumbnail for each of the three video files.
- Drive share permission for each video.
- Booking backend/CRM/notification destinations.
- Client portal authentication provider and client data flow.
- Approved privacy policy, medical disclaimer and cookie/analytics settings.

---

## 13. Package map

- `docs/` detailed design, function, content, QA and release documentation.
- `design/` JSON/CSS design tokens.
- `assets/logo-placeholder.svg` temporary brand mark - replace with official approved logo.
- `assets/icons/` standalone SVG icons.
- `assets/illustrations/` lightweight SVG illustrations.
- `assets/images/` generated illustrative photo assets and visual mockup references.
- `videos/` three original Google Drive links, embed URLs, CSV/JSON manifest and embed snippet.
- `prototype/` responsive HTML/CSS/JS starter demo.

**The food/clinic images in this package are AI-generated placeholders. They are not photographs of the clinic, the dietitian, or real patients. Replace any clinician/patient image with an approved authentic asset before launch.**
