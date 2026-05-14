# Conflict Resolution Report

## 1) Conflict Scenario

The intentional conflict was created in `README.md`. The branches involved were `feature/user-authentication` and `feature/api-endpoints`. On the authentication branch, I edited the feature summary section to describe the login validation and authentication routing work. On the API branch, I edited the same section to describe the modular API endpoints and user validation work.

Because both branches changed the same part of the same file, Git could not automatically decide which version to keep after one branch was merged first. This created the merge conflict.

## 2) What You Saw

When the conflict appeared, Git showed conflict markers in `README.md`. The markers included `<<<<<<<`, `=======`, and `>>>>>>>`. The top section showed the version from the current branch or `main`, and the bottom section showed the incoming change from the other feature branch.

Screenshot reference: the report includes a screenshot of `README.md` showing the conflict markers before the file was resolved.

## 3) Resolution Strategy

To resolve the conflict, I did not keep only one side. I reviewed both versions and combined the useful information from both branches. The final README summary mentioned both the authentication changes and the API endpoint changes.

After choosing the final wording, I removed all conflict markers from the file. I then saved `README.md`, staged the resolved file, and committed the resolution with a clear commit message. After resolving the conflict, I ran the required checks again using `npm test`, `npm run lint`, and `npm run format:check` to confirm the project still worked.

## 4) Prevention Methods

This type of conflict can be reduced by communicating before editing shared files like `README.md`. Team members can also keep pull requests smaller so fewer people edit the same lines at the same time.

Another prevention method is to update feature branches with the latest `main` before merging. This helps developers catch conflicts earlier. It is also useful to split documentation into clear sections so different branches are less likely to change the same paragraph.