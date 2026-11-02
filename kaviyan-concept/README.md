# Kaviyan × Cloud Companions · Homepage concept

## Two consecutive openings / 26 October correction

Tecreate is an additional first section: the two-portrait composition, Lumos title, design/development headline, rounded white preview tray and scene selection. The original Kaviyan hero follows immediately, including its five original cloud actors, pinned introduction, scroll-driven sentence and subsequent timeline. No original Kaviyan section is hidden or replaced.

The three playable previews use the reference studio footage in the middle and two locally rendered, seamless motion treatments of the reference portrait/plant stills on either side. The reference itself supplies only one video in that row. Pause/play, offscreen suspension, visibility suspension and reduced motion are implemented. `tecreate-hero.css` and `tecreate-hero.js` own this component; `tecreate-assets/` holds its local media.

Desktop navigation has an exclusive rail measured from the actual dock bounds, including its width changes at desktop breakpoints. The default minimum is 136px; expansion reserves at least 320px, and that clearance is held until the closing motion has finished. The rail is removed below the navigation's existing 1100px breakpoint. Container-based rules fit the original character fan into smaller desktop content widths without changing its choreography. The mobile headline and portrait occupy separate areas, and the preview tray clears the bottom dock. The character library entry is placed at the top of the page, so it cannot cover content farther down.

Local, independent first-page study of https://kaviyan.framer.website/, captured 25 October 2026. This is separate from the live portfolio in `concept-02`.

The reference's entire header (logo, menu pill, and trial button) is hidden at every breakpoint. The portfolio's own Liquid navigation is reused in an isolated Shadow DOM with its exact dock geometry, optical lens, SVG icon motion, desktop expansion, search, and physical mobile More sheet. Home returns to the concept's top; other portfolio destinations open their existing pages. The portfolio's current Home implementation is unchanged.

The reference homepage composition, typography, responsive breakpoints, illustrations, component styles and Framer motion runtime are retained locally to preserve the requested fidelity. Five of our original animated cloud characters replace the template's plush agents. All twelve original characters are maintained in `../design-system/cloud-companions/` and are accessible through the library button.

## Included

Hero with scroll-driven agent choreography, editing timeline, logos, statistics, four-step product explanation, three creation-mode accordion panels, connected agents, agent cards, services, six-week process timeline, selected projects, interactive gallery deck, team switcher, stories, testimonials, monthly/annual plans, FAQ accordion, contact form layout, closing CTA and footer.

## Scope

Homepage only. Destination links are intentionally inactive in this homepage study. No account, purchase, external messaging or form submission is connected. Text, customers, prices, team identities, metrics and testimonials are reference/template demonstration content, not claims about Yasin's work. This is a local design study, not a public launch.

## Editing

`interactions.js` implements creation-mode switching, gallery tabs, team selection and the billing toggle. `concept.css` and `concept.js` contain the character integration, concept library and interaction boundaries. `index.html` holds the reference page composition and CSS. `runtime/` contains the locally retained Framer modules. `assets/` holds the reference imagery and fonts. `asset-map.json` maps their source URLs. The twelve-character library has separate readable source, motion CSS and original images.

Preview with the existing workspace preview launcher and open `/kaviyan-concept/`. No installation or build step is required.

Persian / English — language-6
The current homepage concept supports English and Persian through the flag toggle at the top. Persian uses a local Vazirmatn variable font, RTL flow and translated navigation, forms, pricing, galleries and character library. Code, email addresses and technical formats retain LTR handling. Language is persisted locally and can be linked through ?lang=fa or ?lang=en. Unsupported language values fall back to the saved supported locale. Translation waits for Framer hydration and observes subsequent dynamic text updates. The source English nodes are retained for reversible switching.
Reference limitation: languageflagtoggle.framer.website returned ERR_CONNECTION_CLOSED during inspection; the switch uses a custom flag treatment matching this concept, rather than a verified exact replica.

Kit polish — revision kit-7
Hero portraits now share a calibrated face scale; the right portrait anchors below the hero edge to remove the floating sleeve gap. Compact viewports show the complete face and more torso at a reduced image scale. UI accent colors use the original portfolio kit grays (#e5e5ea, #93939d, #74747c, #252528); original character artwork retains its colors. Main CTA buttons use rounded pill geometry, 42px desktop / 44px mobile minimum height and the kit's 12px button labels. Persian/English layout and dynamic content are retained.

Cleanup — revision cleanup-8
Removed Numbers (در یک نگاه), Platform / The agents (دستیارها), and Pricing (تعرفه‌ها) from the visible and accessible concept. Their template-owned nodes remain inert for runtime compatibility. Decorative headline and feature icons no longer have black tiles, outlines or shadows. CTA buttons have a single stable label, a consistent 44px height and fully rounded geometry. The ending panel uses one neutral surface; its gallery now has a deterministic responsive arc so it cannot remain blank while the original component waits for viewport hydration. Responsive portrait framing and the calibrated desktop face sizes are retained.
Persian localization avoids modifying source text in pre-rendered third-party boundaries; those regions use accessible translated visual text until their lifecycle completes, avoiding React hydration conflicts. Source English can be restored through the language switch.
