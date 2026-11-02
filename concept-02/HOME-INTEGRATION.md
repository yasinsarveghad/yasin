# Home integration

The approved Home now runs at `/concept-02/index.html#/home` with the full page document, original motion, bilingual UI and appearance controls. `index.html` selects `home.html` or `portfolio-shell.html` for the requested hash route; there is no iframe. Asset base URLs keep the original homepage runtime and stylesheet scope separate from the portfolio shell. Shared Home assets remain in `../kaviyan-concept/`; retain that directory when serving the site.

Other portfolio routes retain the existing shell. Going to Home reloads the Home document at the same index URL; Home navigation to another route reloads the appropriate portfolio document. Theme preference is shared between the shell and Home. The standalone concept remains available.

Validation: Home–Work–Home roundtrip at 390/768/1440px, EN/FA continuous resize at 13 widths from 320 to 1920px, theme switch/reload/light restore at 390/768/1440px in both languages. No runtime errors or horizontal overflow in the checked cases. Logs: work/live-home-test.log, work/live-home-resize.log, work/live-home-theme.log. Personal favicon retained.
