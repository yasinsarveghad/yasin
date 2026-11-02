# Cloud Companions · Character system 2.0

Twelve original characters: NIM, LUMA, PIP, SOL, MIRA, NOVA, ZEN, RUE, KAI, FAY, ORI and NOX.

Each has a transparent body master, an optimized WebP, an independent SVG face/limb rig and a multi-stage CSS performance. Limbs use a lighter tint of the body colour. Faces remain white.

Load `characters.css` and `characters.js`. Render `CloudCompanions.character(character, assetBase)` inside `.cloud-character[data-name]`, setting `--cloud-color` from `CloudCompanions.cast`. `assetBase` is relative to the document, not the module. Reduced-motion preferences pause the acts. Add `.is-resting` to pause an offscreen character.

The editable gallery is available at `/cloud-companions/`. The new homepage study uses ORI, PIP, NIM, NOVA and KAI as its five agents. All twelve are available in the concept's character-library dialog.

Keep these master assets when changing the website. They are independent of the Kaviyan reference/template.

`animated/` contains twelve self-contained SVG performances, including their embedded cloud texture. They can be used directly as image sources without script or DOM integration.
