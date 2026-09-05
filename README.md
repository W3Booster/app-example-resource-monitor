# Observer Economy HUD

A focused W3Booster example by **W3Pad**. Compare current gold, lumber, and supply without leaving the match. This is an **overlay-only** observer tool, not a dashboard squeezed into a corner.

[Try the demo](https://w3booster.github.io/app-example-resource-monitor/) · [Developer docs](https://website.w3booster.com/developer/) · [All examples](https://website.w3booster.com/developer/examples/)

The repository URL remains `app-example-resource-monitor` so existing links and installations survive the workflow redesign.

## Run in one minute

Node.js 22.22.3 or newer. Demo mode needs no account, Warcraft III, desktop client, or database.

```sh
git clone https://github.com/W3Booster/app-example-resource-monitor.git
cd app-example-resource-monitor
npm ci
npm run dev
```

Open **http://localhost:5173/**. Expect **DEMO DATA** and **Connected · synchronized**. Edit **[src/hud.ts](src/hud.ts)** and watch the UI reload. Startup and teardown are in **[src/main.ts](src/main.ts)**; appearance is in **[src/hud.css](src/hud.css)**.

## Try the actual workflow

1. Open the demo and compare each player's resource row.
2. Try **missing data**: absent values remain unavailable, never zero or invented.
3. Try **teams** and **finished**: the layout expands and a finished match is explicitly labeled as a final snapshot.
4. Try **no match**: output disappears rather than covering the game with a waiting panel.

An amber supply indicator means current supply has reached a positive cap; it does not infer a future supply block. No hero roster, trend history, paid-data bypass, or hidden-information access is included. Scopes only request data; the host's authorization and available match data remain authoritative.

## Surfaces and minimum permissions

Register **Stream overlay** and **In-game overlay**, both at `http://localhost:5173/?view=overlay&demo=0`. Leave Application unconfigured. The root page is a browser development preview, not a registered app surface.

Data scopes: `match:read`, `players:read`, `resources:read`. There are no unrelated data permissions. The app-definition file is the registration guide; `example.json` and the tested build manifest declare the same surfaces.

In W3Booster, turn on the configured **Stream** or **In-game** surface. For OBS, copy your W3Booster URL from **Set up OBS** and add it as a browser source. This one source displays all your enabled stream overlays; never paste a user launch URL into OBS.

## Fork and use live data

The overlay canvas uses the `normal` browser color scheme, matching the default
iframe configuration even though its painted UI is dark. Do not add forced-dark
HTML metadata. Browser tests verify real iframe transparency against colored
backgrounds under both light and dark host themes.

The checked-in binding identifies the official example. Cloning source does **not** grant ownership or live access.

1. Enable Developer Mode in W3Booster and create your own application.
2. Use [app-definition.json](app-definition.json) for the exact surfaces, scopes, and settings schema. Supply your own name and hosted URLs.
3. Replace the official binding safely:

   ```sh
   npm run app:fork -- YOUR_NEW_CLIENT_ID
   npm run check
   ```

4. Use **Test locally** with the configured surface URLs above, then launch through W3Booster. Commit the new binding and package configuration.

Direct visits default to offline demo data. Registered live URLs must include `demo=0`. Failed authorization never silently falls back to synthetic data. The application runs with browser APIs and the SDK; it has no arbitrary shell or filesystem access.

## Verify and publish

```sh
npm run check
npm run build
npx playwright install chromium
npm run test:browser
npm run screenshots
```

Tests exercise the real workflow, minimal scopes, configured surfaces, mobile layout, demo/live isolation, and authorization failures. Screenshots capture the real UI, not a mockup.

![Observer Economy HUD: actual runnable interface](docs/screenshot.png)

The included GitHub Actions workflow checks the project and deploys `dist/` to Pages. Enable **Settings → Pages → GitHub Actions** in your fork and replace the official URLs. The build uses the checked-in SDK lockfile and does not fetch private data. Its `example-bindings.json` records the binding actually compiled and the tested supported surfaces.

After editing your registered contract, run `npm run w3booster:sync`; `npm run w3booster:check` verifies the current public definition. Never put credentials or real user captures into the repository or Pages secrets.

For a complete Angular starting point, [build from Match Vision](https://website.w3booster.com/developer/match-vision/). All examples remain together in the [example library](https://website.w3booster.com/developer/examples/).

MIT licensed; retain [LICENSE](LICENSE) when reusing source. No Warcraft artwork is bundled.
