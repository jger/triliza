# [1.3.0](https://github.com/jger/triliza/compare/v1.2.1...v1.3.0) (2026-01-22)


### Features

* update tar to 7.5.6 and add undici, diff, and lodash dependencies ([252c15d](https://github.com/jger/triliza/commit/252c15d74ef827187e6eea99d8c0bbbe5d214fac))

## [1.2.1](https://github.com/jger/triliza/compare/v1.2.0...v1.2.1) (2026-01-22)


### Bug Fixes

* release ([8265c73](https://github.com/jger/triliza/commit/8265c7310945d6e47aa029d5db77a29d0c047670))

# [1.2.0](https://github.com/jger/triliza/compare/v1.1.8...v1.2.0) (2026-01-18)


### Bug Fixes

* remove `test-exclude` patch and `patch-package` dependency. ([4582904](https://github.com/jger/triliza/commit/45829046ae5b11efd62604100dc2d1e2bfc836d6))


### Features

* Migrate project to Next.js and TypeScript. ([b217115](https://github.com/jger/triliza/commit/b217115e0976bc96918709e81e7fd813d00b378c))

## [1.1.8](https://github.com/jger/triliza/compare/v1.1.7...v1.1.8) (2025-12-13)


### Bug Fixes

* update react and react-dom to version 19.2.3, and node-forge to version 1.3.3 in package.json and package-lock.json ([cc90f50](https://github.com/jger/triliza/commit/cc90f50f5e042d8ff013bc6e3a6f31c5bd37cc65))

## [1.1.7](https://github.com/jger/triliza/compare/v1.1.6...v1.1.7) (2025-11-28)


### Bug Fixes

* update dependencies in package.json and package-lock.json to latest versions, including semantic-release to 25.0.2 and @semantic-release/npm to 13.1.2; adjust Node.js version in GitHub Actions workflow to 22 ([16b675b](https://github.com/jger/triliza/commit/16b675bf44b7eddc77d1682b4fb6cce75f1fffd0))

## [1.1.6](https://github.com/jger/triliza/compare/v1.1.5...v1.1.6) (2025-11-28)


### Bug Fixes

* update node-forge to version 1.3.2 and add hasInstallScript to package-lock.json ([f3f96cf](https://github.com/jger/triliza/commit/f3f96cf58588461c394e459b3fad72aab7dda8f9))

## [1.1.5](https://github.com/jger/triliza/compare/v1.1.4...v1.1.5) (2025-11-20)


### Bug Fixes

* upgrade dependencies for security and functionality improvements ([7d742fc](https://github.com/jger/triliza/commit/7d742fc849d3bca6cfd6bef1f7ea0a228fe55b35))

## [1.1.4](https://github.com/jger/triliza/compare/v1.1.3...v1.1.4) (2025-11-16)


### Bug Fixes

* add dev notes and upgrade js-yaml to version 4.1.1 for security fix (CVE-2025-64718) ([d395374](https://github.com/jger/triliza/commit/d3953745d31f8666be7c806dfdcd53445501da91))

## [1.1.3](https://github.com/jger/triliza/compare/v1.1.2...v1.1.3) (2025-07-27)


### Bug Fixes

* add connection timer to multiplayer game for improved user experience ([4e3df0c](https://github.com/jger/triliza/commit/4e3df0cb6e259b51c5698ee466ab3997b55826f5))
* implement disconnect functionality and new game option in multiplayer controls ([3cf8e5d](https://github.com/jger/triliza/commit/3cf8e5dfc9b2dee8125d68a68d42056f9a8c9c2a))
* implement game end handling and player stats update in multiplayer mode ([987f782](https://github.com/jger/triliza/commit/987f78256de636926d75743b1052c76248ec1b30))
* include handleTimerUpdate in multiplayer hooks for improved game state management ([2d2ef48](https://github.com/jger/triliza/commit/2d2ef4885fa801a669741881b60ae00100b33322))
* increase WebRTC connection timeout from 30 seconds to 5 minutes ([d1b5513](https://github.com/jger/triliza/commit/d1b551379f55198530aa82177febc084e9c18063))

## [1.1.2](https://github.com/jger/triliza/compare/v1.1.1...v1.1.2) (2025-07-27)


### Bug Fixes

* enhance multiplayer connection handling with new data sharing features ([65b4a0f](https://github.com/jger/triliza/commit/65b4a0f25b8be85478502feffd50543782ccd9c7))

## [1.1.1](https://github.com/jger/triliza/compare/v1.1.0...v1.1.1) (2025-07-27)


### Bug Fixes

* add game rules documentation and integrate rules modal in the game interface ([de3b95c](https://github.com/jger/triliza/commit/de3b95c8a9a4164ade7c269bcd920eed418395d0))
* enhance multiplayer game state management with WebRTC integration ([56a7b37](https://github.com/jger/triliza/commit/56a7b379e1a24ac2f641bbe8a4bf1f9fd303b74f))

# [1.1.0](https://github.com/jger/triliza/compare/v1.0.4...v1.1.0) (2025-07-27)


### Features

* implement multiplayer functionality with WebRTC support and enhance game state management ([0559af8](https://github.com/jger/triliza/commit/0559af83554ea7738e27fa9706eec04cba9212df))

## [1.0.4](https://github.com/jger/triliza/compare/v1.0.3...v1.0.4) (2025-07-27)


### Bug Fixes

* add automatic version display in the app and update release workflow ([5304a30](https://github.com/jger/triliza/commit/5304a303cef8ea646d00ad42aa9348cfce34d2cd))

## [1.0.3](https://github.com/jger/triliza/compare/v1.0.2...v1.0.3) (2025-07-27)


### Bug Fixes

* **ui:** enhance responsiveness of game board and cells with dynamic sizing ([dbf3299](https://github.com/jger/triliza/commit/dbf329990e03f39e29fd05c6d8ab6f8be246664c))
* **ui:** prevent text selection in Cell component for improved user experience ([ffcf251](https://github.com/jger/triliza/commit/ffcf251661cec5fdca4c2334a1e3195a6eeaf199))
* **ui:** show playing symbol right to mouse pointer ([c197e78](https://github.com/jger/triliza/commit/c197e788c5d5f464f80be145128a652f924a350a))

## [1.0.2](https://github.com/jger/triliza/compare/v1.0.1...v1.0.2) (2025-07-27)


### Bug Fixes

* update README version format in semantic-release workflow ([7c4669d](https://github.com/jger/triliza/commit/7c4669df7356465e676b55337bca3006a8f5012d))

## [1.0.1](https://github.com/jger/triliza/compare/v1.0.0...v1.0.1) (2025-07-27)


### Bug Fixes

* Integrate README version update into semantic-release workflow and remove redundant update-readme-version workflow ([69eb91a](https://github.com/jger/triliza/commit/69eb91a25bacd6cc16e2f630b86557b16b792294))

# 1.0.0 (2025-07-27)


### Features

* Add new documentation files and update project metadata for improved user experience and SEO ([74e502b](https://github.com/jger/triliza/commit/74e502bdcd64c414c0fa596593ab6384236f99db))
* Introduce new Box and Row components, update styles, and refactor constants for improved game structure and UI. Add GameOver component and integrate CSS for better styling. ([a0e34f3](https://github.com/jger/triliza/commit/a0e34f37ff8074e5fb4e7d703b7bc6f688e45de2))
* Upgrade React to version 18 and integrate React Native Web for improved cross-platform support. Update App component to use React Native components, refactor Box, Newgame, Gameover, and Row components for consistency. Enhance README with installation notes and project details. ([faa7dea](https://github.com/jger/triliza/commit/faa7deaec874228065592752f7f467b42c0655b0))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0] - Initial Release

### Added
- Initial React Tic-Tac-Toe game implementation
- Game board with 3x3 grid
- Player turn management
- Win detection logic
- Game over state handling
- New game functionality
- GitHub Pages deployment
