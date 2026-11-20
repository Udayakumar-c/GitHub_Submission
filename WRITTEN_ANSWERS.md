# Part Assignment 5 

## Task 2: Retry Mechanism and Flaky Test Handling
**1. Retry mechanism**
Retry Mechanism means Playwright runs a failed test again.
Why:      Some tests fail randomly because of slow pages or network, not because the app is broken.
Benefit:  Fewer false failures.
Setup:    `retries`: 2 in `playwright.config.js`.

**2. Flaky tests and common causes**
Flaky Test means a test that sometimes passes and sometimes fails, even when the code has not changed.
Common reasons:
Timing issues:              The test acts before the page or element is ready.
Slow network or server:     API responses arrive late or inconsistently.
Animations or popups:       The test clicks before an animation finishes or a popup appears.
Shared test data:           Multiple tests use the same data or account and affect each other.
Environment differences:    Different browsers, screen sizes, OS, or CI machines behave differently.
Test order dependency:      One test passes only because another ran before it.
Random or time-based data:  Logic depends on random values, dates, or the current time.
Weak locators:              Elements are found by position or text that often changes.

**3. How Playwright identifies and handles flaky tests**
Identifying:       If a test fails and then passes on a retry, Playwright marks it as flaky instead of passed or failed.
Where you see it:  The terminal summary shows a separate **flaky** count, and the HTML report labels those tests.
Retry tracking:    test.info().retry tells you which attempt is running, so you can check it in code.
Debugging:        `trace: 'on-first-retry'` records a trace only for the retry, so you can open it in the Trace Viewer and see what went wrong.
Per-test control:  test.describe.configure({ retries: 3 }) sets retries for one group of tests.
Handling it well:  Use retries as a safety net, then find and fix the root cause such as a timing issue, a weak locator, or shared test data.

**4. How retries improve reliability**
Absorbs random failures:      A test that failed because of a brief slow response or animation can pass on the next attempt.
Fewer false alarms:           The team sees fewer red builds caused by timing or environment noise, not real bugs.
More trust in CI:             A failing build is more likely to mean something is actually broken.
Keeps the pipeline moving:    One unlucky test does not block a deployment or stop the whole run.
Shows where the problems are: Tests marked flaky point to the unstable areas that need fixing.
Limit:                        Retries only hide symptoms. Use them with traces and fixes for the root cause.

## Task 5: Assertions (Hard and Soft) and Debugging Methods
**1. What assertions are**
- An assertion checks that the actual application state matches the expected state.
- They turn a test from "the steps ran" into "the behaviour is correct", which is the purpose of test automation.

**2. Hard vs soft assertions**
- **Hard assertion** (default `expect`): stops the test at the first failure.
  ```js
  await expect(page.getByText('Welcome')).toBeVisible(); // test stops here if it fails
  ```
- **Soft assertion** (`expect.soft`): records the failure but keeps running, so several checks can be reported in one run.
  ```js
  await expect.soft(page.locator('#firstname')).toHaveValue('Sibi');
  await expect.soft(page.locator('#lastname')).toHaveValue('Kumar'); // runs even if the line above fails
  ```
- Use hard assertions when later steps depend on earlier ones. Use soft assertions when checking many independent fields.

**3. Debugging methods in Playwright**
- `page.pause()`: pauses the test at that line and opens the Playwright Inspector.
- Playwright Inspector (`PWDEBUG=1` or `npx playwright test --debug`): step through actions, inspect locators, and see the DOM.
- `--debug` mode: runs headed, with the Inspector attached, and waits at each action.
- `--headed` mode: runs the browser visibly so you can watch the test happen.
- Trace viewer (`npx playwright show-trace`): replays actions, network, and screenshots after a failure.

**4. How these tools help**
- `page.pause()` stops at an exact point, so you can check the page state at that moment.
- The Inspector lets you test locators live and step line by line.
- `--headed` shows timing and visual problems that logs do not reveal.
- `--debug` combines stepping with the browser view, which is useful for failures that happen mid-flow.
