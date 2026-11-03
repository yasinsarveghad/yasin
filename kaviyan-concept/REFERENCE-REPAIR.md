# Homepage component repair

The Create Ways and Team components now use their retained Framer implementations, including the authored variants, six-second progression, tap controls and responsive stacked layout. The competing substitute content, flex sizing, opacity and transform overrides were removed from interactions.js and concept.css.

reference-fixes.css restores the Connected section's original transparent mint and peach radial fields. It also preserves LTR source-code samples and numeric carousel pagination within the Persian layout.

The shared monochrome action styles are in ../concept-02/buttons.css and are loaded by the live Home, standalone concept and portfolio shell. They provide 48px targets, a clipped two-label roll, one arrow, reversible fill transitions, keyboard focus, touch-safe hover gating and reduced-motion support. Persian label colours are explicit to avoid inheriting transparent text from the translation overlay.

Boxcars' live demo returned connection resets during this revision. Its official marketplace preview was viewable; the exact interactive Boxcars timing and hover implementation have not been verified. The action motion here is an independent implementation rather than a claimed exact copy.

Validation: Home checked at 320, 390, 599, 600, 768, 810, 1024, 1200, 1440 and 1920px in both English and Persian; native Create Ways and Team control state changes checked; no horizontal overflow, page errors or failed HTTP assets in those runs. Action text visibility, single-arrow rendering, 48px height and hover reset checked in both themes and languages; reduced-motion transitions checked.
