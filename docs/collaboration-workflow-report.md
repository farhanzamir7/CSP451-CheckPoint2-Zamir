# Collaboration Workflow Report

## 1) Issues Created

I used one issue for each required feature branch. Issue #1 was for the user authentication work, including login validation, the auth service, and the `/api/auth/login` route. Issue #2 was for the database connection work, including environment-based config, `connect()`, and helper functions. Issue #3 was for the API endpoint work, including route modules, a users endpoint, and input validation.

## 2) PR Summary (3 PRs)

PR #1 was titled `feat(auth): add login authentication workflow` and linked to Issue #1 using `Closes #1`. The key changes were adding `src/services/authService.js`, adding an authentication route, mounting it in `src/app.js`, and improving `public/login.js`. Screenshots are included: Y.

PR #2 was titled `feat(db): add database connection helpers` and linked to Issue #2 using `Closes #2`. The key changes were updating `src/db/index.js` to read database settings from environment variables, add an in-memory connection helper, and provide query/insert helpers. Screenshots are included: Y.

PR #3 was titled `feat(api): add modular API endpoints` and linked to Issue #3 using `Closes #3`. The key changes were refactoring the API health route into a module and adding a users route with GET and POST validation. Screenshots are included: Y.

## 3) Self-Review Evidence

I used comment-based self-review on the pull requests. On the authentication PR, I reviewed the login validation and noted that the form should give clearer feedback while the API request is processing. I also reviewed the route changes to confirm the new auth route was mounted under `/api/auth`.

The critical self-review comment was on PR #1. The comment requested better login loading feedback before the API call completed. I addressed that feedback with a follow-up commit titled `fix(auth): improve login loading feedback`, then pushed the commit to the same branch so it appeared in the PR timeline.

For the database PR, I reviewed the environment variable configuration and checked that the database password was masked in the returned config. For the API PR, I reviewed the new users endpoint and checked that invalid name or email input returns validation errors.

Before merging, I ran `npm test`, `npm run lint`, and `npm run format:check` on the feature branches to confirm the project still passed the required checks.

## 4) Merge Strategy

I used **Squash and merge** for the pull requests. This keeps the `main` branch history cleaner because each completed feature branch becomes one final commit on `main`. It also makes the commit history easier to read and easier to roll back if one feature causes a problem later.
