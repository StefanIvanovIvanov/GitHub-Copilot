**Project Instructions**

This file captures high-level, persistent instructions for assistant behavior and project conventions for this workspace. Apply these rules when making UI, styling, or small-API changes unless the user explicitly requests otherwise.

- **Scope:** Applies to files under the workspace root unless an instruction specifically scopes to a subfolder (for example, `Bucks2Bar/`).
- **Enforcement:** Strong preference for consistency. Treat accessibility and technical constraints as reasons to deviate only when justified.

**Stylistic Conventions**
- **Buttons:** All buttons must have a pink background color.
- **Currency:** Use `$` and `en-US` formatting for monetary displays and tooltips by default.
- **Layout:** Prefer responsive Bootstrap 5 utility classes and the grid system for layouts and small input groups for form controls.
- **Chart Colors:** Income = green (`rgba(75, 192, 96, 0.85)`), Expenses = red (`rgba(255, 99, 102, 0.85)`).
- **Header:** Keep a white header with a large title for the app (e.g., `Bucks2Bar - Budget Tracker`).

**Coding & UX Patterns**
- Use semantic HTML and avoid tables for form-like lists; use responsive rows/columns instead.
- Inputs for currency should include a leading `$` prefix element and small, slightly rounded controls.
- Provide clear primary actions: e.g., an `Update Chart` button in data views and a blue `Download` button on chart views (use project styling rules for colors).

**Assistant Behaviour**
- When modifying UI or charts in `Bucks2Bar/`, follow the UI spec in `AGENTS.md` and the above color, layout, and formatting rules.
- Prefer minimal, focused edits. Explain changes briefly and offer to run or test when appropriate.
- When the user requests a workspace-wide rule, confirm scope before applying broadly.

**Creating / Updating These Instructions**
- Draft changes here, then ask the user to confirm scope and any exceptions (accessibility, localization, etc.).
- When adding a new rule, include an example prompt and one-line rationale.

**Example Prompts**
- "Update the Bucks2Bar UI to match the screenshots and use USD formatting."
- "Replace the data table with a responsive list layout and ensure buttons use the project pink color."

If you want these rules saved in a different filename or formatted as `copilot-instructions.md`, tell me which filename to use and I will create or move it.
