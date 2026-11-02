# Motion — continuous timing revision

The resting revision 06 silhouettes and outline weights remain unchanged.

Icon parts follow an exact critically damped spring. Trajectories are sampled at 120 Hz once per activation and played with WAAPI, using transform and opacity. The browser interpolates between samples; there is no per-frame DOM update loop. Each part has a short outward phase followed by one continuous return. Folder opening, paper and front share a coordinated 185–205 ms outward phase; simple symbols use a shorter phase.

On repeated activation, both position and velocity are sampled from the active trajectory before replacement. Completion returns to the underlying static artwork and releases the animation record. Closing the tab's visibility or enabling reduced motion cancels active effects. Static exports remain available under symbols/.

Theme colors interpolate live for 360 ms and naturally reverse from their current values. A low-opacity circular cue lasts 420 ms in an overflow-clipped, non-interactive layer. There are no page snapshots, document-wide input interception, queued theme clicks, or special coordinate click handlers. Only one cue layer is reused. Keyboard and reduced-motion activation apply the theme immediately.

The previous snapshot-based theme reveal was replaced to keep controls responsive during rapid interactions. Native modal focus behavior and the existing drag-driven card spring are preserved.

Source: symbol-motion.js, symbols.js, design.js and the final theme section of design.css. The interactive study at symbols.html uses the actual site renderer and engine.

## Landing revision
All parts of an icon now share one timeline and an exact 100 ms endpoint hold. The animation retains its last frame until the same endpoint transform and opacity are committed to the SVG element, then its WAAPI effect is released. Both resting and animated geometry use the same 2D transform model. This avoids dropping directly from an animated 3D effect to CSS transform:none. Repeated activation still samples position and velocity. Current behavior remains one complete cycle returning softly to the initial silhouette; this revision does not add a persistent selected-open pose.

## Longer, more legible choreography
Current timing supersedes earlier outward-phase values: Work has a 300–350 ms outward phase and 833 ms complete shared timeline. Other measured durations: Home 558 ms, Store 700 ms, About 625 ms, More 600 ms, Services 642 ms, Journal 617 ms, Contact 750 ms, Search 517 ms, Close 592 ms, Grid/List 583 ms. Amplitudes were increased without altering resting silhouettes. Coordinated endpoint hold, position/velocity handoff and endpoint commitment are retained. Mobile route activation plays feedback in the persistent dock as the modal card exits, so closing the card does not cut off all visible feedback.
