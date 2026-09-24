# Birthday site

Three pages, one shared style: `index.html` (countdown) → `happy-birthday.html`
(video + Next) → `memories.html` (chat → 4 scratch-off cards).

## Set the countdown target
Open `js/countdown.js`, first line:
```js
const TARGET_DATE = new Date('2026-10-01T00:00:00');
```
Change to the exact date/time you want it to hit zero.

To preview the burst without waiting, open `index.html?skip` — it'll count
down from 3 seconds instead.

## Add your video
Drop your file at `assets/video.mp4` (replace the placeholder that isn't
there yet). The on-screen placeholder text disappears automatically once
the video loads.

## Add your photos
Replace `assets/memory-1.svg` … `memory-4.svg` with real photos (any
format — update the `src` in `memories.html` if you rename them). Update
the four `data-caption` / `.caption` text in `memories.html` to your real
captions.

## Consistent UI
Everything shared (colors, fonts, buttons, spacing) lives in
`css/style.css` under the `:root` variables at the top — change a value
there and it updates on every page.
