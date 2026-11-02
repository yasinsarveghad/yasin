# Concept 02 — revision 03

Slot geometry adapted from the user's Titana LiquidNav (app/liquid-nav.tsx and lib/liquid-layout.ts).

This revision uses opaque Apple system gray (#e5e5ea), with a separate clear optical lens built from transmission, rim highlights and inner caustics. Neither navigation surface uses backdrop blur. This is a browser interpretation, not Apple's native Liquid Glass renderer.

Desktop expands the same rail and gives content room. Phone and tablet use a rounded pairing card with an exact critically damped spring. Direct dragging preserves velocity into dismissal or return. Reduced motion skips spring travel.

Uses supplied SF Pro Display and Yasin's portrait. Original website and GitHub repository are unchanged. See CHECKS.txt for verification details.

Current revision screenshots: ../liquid-03-desktop.jpg, ../liquid-03-mobile.jpg, ../liquid-03-tablet.jpg. Earlier liquid-02 screenshots describe the older concept.

## Revision 05 — original symbol family

13 original SVG drawings created for the portfolio, on a 24-unit grid. Inspired by rounded terminals, clear silhouettes and optical consistency; no Apple SF Symbols assets were copied or embedded. Central renderer: symbols.js. Reusable exports: symbols/*.svg. Visual reference sheet: symbols.html. Contextual dimensions and weights are defined by CSS.

## Revision 06
Original drawings simplified into low-detail silhouettes. Source: work/refine-symbols-06.py. Current previews: symbols-06-*.jpg. Current renderer and exported SVGs share the same geometry.

## Motion revision
Original vector layers are animated with the Web Animations API. No Telegram assets or third-party motion library were copied. Static individual SVG exports remain the clean revision 06 artwork; symbols.js includes transient motion layers. See MOTION.md and symbols.html for the live design study.

## Continuous motion refinement
Updated symbol timing to critically damped, velocity-preserving trajectories. Replaced snapshot theme reveal with live color interpolation and a subtle non-interactive cue. Current cache key: motion-smooth-1. See MOTION.md for current behavior.

## Transparent favicon
User supplied dark and white sources retained in favicon/. Clean source alpha supplies identical monochrome silhouettes for both schemes; white reference glow excluded. Adaptive SVG and media PNG fallbacks follow browser/system preference. No background tile. See favicon/README.txt.

## Transparent favicon
User supplied dark and white sources retained in favicon/. Clean source alpha supplies identical monochrome silhouettes for both schemes; white reference glow excluded. Adaptive SVG and media PNG fallbacks follow browser/system preference. No background tile. See favicon/README.txt.
