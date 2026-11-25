# BFourU motion guidelines

Motion is **smooth, calm and purposeful**: it explains a change or guides attention — it never decorates.

## Principles
1. **Purposeful** — every movement has a reason (reveal, feedback, continuity).
2. **Calm** — ease-out curves; no bounce, elastic, spin or flashing.
3. **Continuous** — objects move to their new position instead of disappearing (Morph in PowerPoint).
4. **Respectful** — honour `prefers-reduced-motion`; nothing auto-plays with sound.

## Tokens
| Token | Value | Use |
|---|---|---|
| `--bf-dur-feedback` | 180 ms | hover, press, toggles |
| `--bf-dur-short` | 320 ms | colour changes, menus |
| `--bf-dur-reveal` | 700–900 ms | scroll reveals, panels |
| `--bf-dur-scene` | 1100–1250 ms | headline lines, Morph |
| stagger | 60–110 ms | between sequenced items |
| `--bf-ease` | cubic-bezier(0.2, 0.7, 0.1, 1) | standard UI and reveals |
| `--bf-ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | entrances, Morph-like moves |

CSS: `bfouru-motion.css` in this folder (also included in `/05-Design-Tokens/bfouru-tokens.css`).

## Behaviours
| Element | Behaviour |
|---|---|
| **Logo animation** | The four cells rotate in from −90° and scale 40→100 %, staggered 70 ms; the Persimmon circle lands last. Wordmark fades in after. Total ≤ 1.2 s. |
| **Typography reveal** | Headline lines rise from 105 % inside a mask, 1100 ms, stagger 110 ms. Body copy fades up 14 px after 350 ms. |
| **Page transitions** | Fade + 10 px rise, 600 ms — only on in-app navigation, never on first load. |
| **Scroll animation** | Reveal once at ~8 % visibility: 28 px rise + fade, 700–900 ms. No scroll-jacking; no parallax on text. |
| **Hover** | Buttons: Persimmon fills from below (420 ms), arrow swaps. Links: underline draws left→right (380 ms). Cards lift 3 px. |
| **Presentations** | Morph between slides (1.25 s) using shared object names prefixed `!!`; on-click reveals with Fade, Float In, Wipe or Zoom only. |
| **Social motion** | 6–10 s loops; each line holds ≥ 1.5 s; logo end-card 1.5 s on Forest Ink; captions burned in; text inside the centre 80 % safe area. |
| **Video** | Logo end-card 1.5 s; lower-thirds in Instrument Sans SemiBold on a 60 % Forest Ink bar; cuts or 300 ms cross-fades only. |
| **3D motion** | Not part of the current identity. If ever used: one slow rotation ≤ 15°, matte brand colours, never behind text. |

## Reduced motion
When the user prefers reduced motion: no reveals, marquees or parallax; content appears instantly; state changes may use a 0–120 ms opacity change.

## Avoid
Bounce, elastic, spin, flash, typewriter effects, confetti, auto-playing sound, any UI motion longer than 1.5 s.

## Reference implementations
- Website: `src/styles/global.css` and `src/lib/hooks.ts` (reveals, hero line masks, button fills).
- Presentation: `presentation/output/BFourU-Healthcare-Deck.pptx` (Morph + on-click entrances).
