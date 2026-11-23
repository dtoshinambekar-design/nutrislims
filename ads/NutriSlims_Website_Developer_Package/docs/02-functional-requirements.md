# Functional and Interaction Specification

## Global interactions
| Component | Interaction | Required behaviour |
|---|---|---|
| Header | Sticky on scroll | Remains usable; anchor offsets prevent overlap |
| Main nav | Click/keyboard | Dropdowns open on click; Escape closes; focus is managed |
| Search | Click/Enter | Opens search panel; supports services, recipes, FAQs and articles |
| CTA | Click | Opens booking route, phone dialler or WhatsApp |
| Mobile drawer | Menu/close | Locks background scroll; Escape closes; focus returns to trigger |
| Sticky mobile CTA | Call/WhatsApp/Book | Fixed above safe area; page bottom padding prevents content obstruction |

## Booking form states
1. Idle: visible labels, required markers and privacy link.
2. Editing: inline validation after blur/submit.
3. Submitting: disable duplicate submit, show progress.
4. Success: show reference ID/next steps and send confirmation.
5. Failure: preserve entered fields and show a clear retry path.

## Video player modal states
- Poster card with explicit Play button.
- On play: instantiate iframe with correct `title`, `allowfullscreen`, `loading=lazy` and preview URL.
- Modal: close button, Escape close, focus trap, focus restore.
- If embed blocked: show Open in Google Drive link.
- No autoplay sound. No video content description until reviewed.

## Recipe interaction
- Filters are multi- or single-select as specified by product owner.
- Search matches title and ingredient terms.
- Portion count updates ingredient quantity. Nutrition updates only if source recipe data supports correct scaling.
- Save requires user account or clearly labelled local-only save.

## Calculator interaction
- Use numeric input with explicit unit.
- Do not calculate until required fields are valid.
- Display formula/limitations and reviewed-on date.
- Screeners must not present an output as diagnosis.

## Data and integration contracts
- Clinic settings: single source of truth for address, phone, email, hours and social URLs.
- Booking: POST to backend endpoint; server validates, rate-limits, stores only required data, and sends notifications.
- Google reviews: use approved Google Business Profile API or official review link/embed.
- Videos: use `videos/videos.json` and `embed_url`; confirm permissions before launch.
- Newsletter: integrate consent-aware email service; provide unsubscribe.
- Client portal: authentication and authorisation entirely server-side.
