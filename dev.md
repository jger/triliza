# Dev Notes

## Security Updates
- js-yaml: upgraded to ^4.1.1 (CVE-2025-64718 fix) via package.json overrides
- glob: upgraded to ^11.1.0 (CVE-2025-64756 fix) via package.json overrides - production safe
- @semantic-release/npm: upgraded to ^13.1.2
- Note: Remaining glob vulnerabilities are in dev dependencies (npm bundled in semantic-release packages). These don't affect production builds. Waiting for npm/semantic-release to update bundled glob.
- GitHub Pages deployment updated with security fixes

