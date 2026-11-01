# Yasin Sarveghad — portfolio

Complete static portfolio, including the approved animated Home, selected work folders, store and profile pages, Persian/English UI, light/dark appearance, original cloud character system and earlier design studies.

## Run locally

From this repository root run `python -m http.server 4185`, then open `http://localhost:4185/`.

Serve the repository root (not an individual subfolder). No npm install/build or API keys are required. All runtime modules, fonts, portraits, image cutouts, videos and animated SVG characters are included locally.

## Structure

- `concept-02/`: main portfolio, entry route `index.html#/home`.
- `kaviyan-concept/`: shared homepage assets/runtime and standalone approved design study. Keep this folder: Home depends on it.
- `design-system/cloud-companions/`: twelve original animated characters.
- `sidefolio/`: shared fonts and portfolio media.
- `work-folder-concept/`, `cloud-companions/`, `concept-01/`: independent design studies.

## Scope

The portfolio is a static frontend. Sample product purchase links and contact submissions retain their existing prototype behavior; no payment or backend service has been added. Existing template/source attribution is retained in the included provenance documents. Publishing this repository does not itself configure hosting. Paths expect a domain/server root; GitHub Pages project-subpath hosting would require a separate base-path adaptation.

## Verification

English/Persian responsive checks from 320–1920px, Home/Work navigation, appearance persistence, local media loading, gallery motion and reduced-motion behavior were verified during development. See component CHECKS and HOME-INTEGRATION documents for coverage.
