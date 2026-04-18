# Design System Strategy: The Digital Curator
 
## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Nocturnal Gallery."** We are moving away from the "app-as-a-utility" look toward an editorial, immersive experience that treats digital content as curated art. 
 
This system rejects the rigidity of standard mobile grids. Instead of boxed-in layouts, we use **intentional asymmetry** and **tonal layering** to guide the eye. By eliminating 1px borders and heavy outlines, we create a "liquid" interface where elements float in a deep, cohesive space. The goal is a high-end, premium feel that prioritizes breathing room, sophisticated typography scales, and a tactile sense of depth.
 
---
 
## 2. Colors & Surface Architecture
Our palette is rooted in deep obsidian tones, designed to make content pop while reducing eye strain.
 
### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or subtle tonal transitions.
*   **Correct:** A `surface-container-low` card sitting on a `surface` background.
*   **Incorrect:** A card with a 1px `outline` border.
 
### Surface Hierarchy & Nesting
Depth is achieved through the physical stacking of the `surface-container` tiers. Treat the UI as a series of nested layers:
*   **Base:** `surface` (#111317) or `surface-container-lowest` (#0c0e12) for the primary background.
*   **Layout Sections:** Use `surface-container-low` (#1a1c20) to define broad content areas.
*   **Floating Elements/Cards:** Use `surface-container` (#1e2024) or `surface-container-high` (#282a2e) to pull interactive elements closer to the user.
 
### The Glass & Gradient Rule
To achieve "The Nocturnal Gallery" aesthetic, use the primary gradient (`#85adff` to `#6c9fff`) sparingly but impactfully. 
*   **Signature CTAs:** Apply the gradient to primary buttons and active states.
*   **Glassmorphism:** For floating navigation bars or modal headers, use a semi-transparent `surface-bright` with a `backdrop-blur` of 20px. This allows the background colors to bleed through, creating a "frosted glass" effect that feels integrated rather than "pasted on."
 
---
 
## 3. Typography
The typographic voice is an interplay between the authoritative, geometric **Manrope** and the functional, Swiss-inspired **Inter**.
 
*   **Display & Headlines (Manrope):** These are your "Editorial Anchors." Use generous letter-spacing (tracking: -0.02em) and tight line heights for a bold, confident look. The massive scale jump from `display-lg` (3.5rem) to `body-md` (0.875rem) creates the necessary high-contrast hierarchy for a premium feel.
*   **Body & Labels (Inter):** Inter handles the "Utility." It provides maximum readability for metadata and descriptions. 
*   **Visual Hierarchy:** Titles should always use `on-surface` (#e2e2e8), while secondary descriptions or "meta" info should use `on-surface-variant` (#c3c6d3) to create a natural visual recedence.
 
---
 
## 4. Elevation & Depth
In this system, elevation is a product of light and tone, not structure.
 
*   **The Layering Principle:** Stacking `surface-container-highest` on top of `surface-container-low` creates a soft, natural lift. This is our primary method of separation.
*   **Ambient Shadows:** If an element must float (e.g., a FAB or a detached navigation bar), use an ultra-diffused shadow:
    *   `blur: 40px`, `y: 12px`, `opacity: 6%`.
    *   **Shadow Color:** Use a tinted version of `on-secondary-fixed-variant` rather than pure black to keep the shadows "airy."
*   **The Ghost Border Fallback:** If accessibility requirements demand a container boundary, use a **Ghost Border**: `outline-variant` at 15% opacity. It should be felt, not seen.
 
---
 
## 5. Components
 
### Buttons
*   **Primary:** Full `ROUND_FULL` (9999px). Gradient background (#85adff to #6c9fff) with `on-primary` (#002f67) text. No shadow.
*   **Secondary:** `surface-container-highest` background. Subtle and integrated.
*   **Tertiary:** Text-only with an `on-primary-container` color, used for low-emphasis actions.
 
### Cards & Lists
*   **The Divider Ban:** Never use line dividers between list items. Use 16px or 24px of vertical whitespace (per the spacing scale) or subtle alternate background shifts (Zebra striping using `surface-container-low` and `surface-container`).
*   **Curvature:** All cards must use `lg` (2rem) or `xl` (3rem) corner radius to maintain the organic, premium feel.
 
### Input Fields
*   **Style:** Filled containers using `surface-container-high`. No bottom line.
*   **Focus State:** Instead of a border change, the container should shift to `surface-bright` or display a subtle `surface-tint` glow.
 
### Interactive Chips
*   **Filter Chips:** Use `ROUND_FULL`. Unselected: `surface-container-low`. Selected: Primary gradient with `on-primary` text.
 
---
 
## 6. Do's and Don'ts
 
### Do
*   **DO** use whitespace as a functional tool. If in doubt, add more padding.
*   **DO** use "Overlapping Elements." Let an image card slightly overlap a headline to create a bespoke, non-template layout.
*   **DO** utilize `surface-bright` for hover states to create a "glow" effect in the dark theme.
 
### Don't
*   **DON'T** use 1px lines. They break the "Liquid UI" immersion.
*   **DON'T** use pure black (#000000). Always use the specified `surface` or `surface-container-lowest` for the deepest tones.
*   **DON'T** use standard "drop shadows" with high opacity. They look "cheap" against the curated tonal surfaces of this system.
*   **DON'T** crowd the edges. The `ROUND_FULL` aesthetic requires significant internal padding (minimum 1.5rem) to look intentional.```