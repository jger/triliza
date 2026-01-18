# Available Scripts

In the project directory, you can run:

## `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000/triliza](http://localhost:3000/triliza) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

To stop the development server, press `Ctrl+C` in the terminal where it's running.

## `npm run build`

Builds the app for production.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build finds static pages and exports them to the `out` folder (SSG/Static Export).<br>
Your app is ready to be deployed!

## `npm run deploy`

Builds the application and deploys the `out` directory to GitHub Pages.
This script:
1. Creates a `.nojekyll` file in `out/` to bypass Jekyll processing.
2. Pushes the content of `out/` to the `gh-pages` branch.

## `npm run lint`

Runs Next.js linter to check for code quality issues.