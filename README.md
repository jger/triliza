# Triliza - Multi-Dimensional Tic-Tac-Toe Game

**Current Version: 1.0.3**

A modern implementation of the classic Tic-Tac-Toe game built with React Native Web, featuring enhanced gameplay in higher dimensions. Experience the timeless strategy game with a beautiful, responsive interface.

## 🎮 Play Online

**[Play Triliza Now](https://jger.github.io/triliza/)** - Free online multiplayer game

## ✨ Features

- **Multi-dimensional gameplay** - Experience Tic-Tac-Toe in higher dimensions
- **Two-player mode** - Play with friends locally
- **Responsive design** - Works perfectly on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface built with React
- **Cross-platform** - Built with React Native Web for universal compatibility
- **Automatic version display** - Shows current app version in bottom-right corner

## 🚀 Coming Soon

- Enhanced UI improvements
- Player vs Computer mode
- Additional game dimensions
- Score tracking and statistics

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and converted to React Native Web.

## Installation

In the project directory run:

### `npm install`

## Available Scripts

See [SCRIPTS.md](SCRIPTS.md) for detailed information about available npm scripts.

### Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

```bash
npm start
npm test
npm run build
```

## Deployment

The app automatically deploys to GitHub Pages when you push to the master branch. The deployment process:

1. **Semantic Release**: Automatically determines version based on commit messages
2. **Build**: Creates production build with version injected
3. **Deploy**: Publishes to GitHub Pages

**Note**: Make sure to push to the `master` branch for automatic releases.

### Commit Message Format

Use conventional commits for automatic versioning:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `BREAKING CHANGE:` - Breaking changes (major version bump)

Example:
```
feat: add new game mode
fix: resolve board rendering issue
BREAKING CHANGE: change game API
```

## Version Display

The app automatically displays the current version in the bottom-right corner. This version is:

- Automatically updated by semantic-release
- Injected during build process
- Visible in the deployed GitHub Pages app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


