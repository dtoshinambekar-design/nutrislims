# Supplied video links

All three original Google Drive share links and their `/preview` embed URLs are recorded in `videos.json` and `videos.csv`. The source video binaries are **not included** because the links point to Drive-hosted files; this ZIP contains the integration metadata and embed instructions.

## Required sharing setup
1. Open each file in Google Drive.
2. Choose Share.
3. Under General access select `Anyone with the link`.
4. Set role to `Viewer`.
5. Test the `/preview` URL in an incognito browser before release.
6. If organisation policy prevents public sharing, use an authenticated video provider or upload the files to the website's private media storage/CDN.

## UX requirements
- Show three portrait video cards under the heading `Watch. Learn. Eat Better.`
- Use `loading=lazy`; do not autoplay sound.
- On click, open an accessible modal or navigate to a full-screen player.
- Provide an `Open on Google Drive` fallback link.
- Add a short editorial title, caption, duration and poster image only after a human has reviewed the actual clip. Do not infer video subject from the file name.
- Include captions/subtitles and transcript when available.
- Respect user consent and privacy; no personal health information or patient image may be published without written permission.
