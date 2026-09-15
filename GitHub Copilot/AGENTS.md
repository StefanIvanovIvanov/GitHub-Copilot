# Workspace Copilot Instructions

Purpose
- Provide persistent guidance to the assistant for UI, styling, and behavior choices in this Bucks2Bar project.

Context extracted from current conversation
- The user wants the Bucks2Bar UI to match provided screenshots: white header with large title "Bucks2Bar - Budget Tracker", Data and Chart tabs, a blue Download button on the chart view, and an "Update Chart" control in the data view.
- Currency should be displayed in dollars (`$`) and formatted using `en-US` locale for tooltips and axis ticks.
- The month inputs should render as a responsive list/grid (not a HTML table) with three logical columns: month label, income input, expense input.
- Chart styling: income bars in green, expense bars in red; chart should be responsive and maintain a large canvas area (approx 56vh height).
- Inputs should use small input groups with a leading `$` prefixed element and slightly rounded controls.
- Prefer Bootstrap 5 utility classes and responsive grid for layout.

Enforcement level
- These are project-level conventions for the Bucks2Bar app only (apply to files under `Bucks2Bar/`).
- Consider them strong preferences for UI/UX consistency, but allow exceptions if the change is needed for accessibility or technical constraints.

When the assistant is asked to modify UI or chart code in this project
- Use `en-US` number formatting and `$` currency symbol for display and tooltips.
- Use responsive Bootstrap grid rows for the data inputs instead of a table element.
- Keep header simple and white background; large title `Bucks2Bar - Budget Tracker` as first-level heading.
- Chart datasets: income = green (`rgba(75, 192, 96, 0.85)`), expenses = red (`rgba(255, 99, 102, 0.85)`).
- Provide a prominent blue download button labeled "Download" on the Chart tab.
- Add a clear primary "Update Chart" button in the data area that switches to the Chart tab and re-renders the chart.

Suggested prompts to exercise these instructions
- "Update the Bucks2Bar UI to match the attached screenshots and use USD formatting."
- "Replace the data table with a responsive list layout and adjust chart colors to green/red."
- "Make the Download button blue and ensure the chart canvas fills the available width and about 56vh height."

Open questions / clarifications
1. Scope: Should these rules apply only to `Bucks2Bar/` or across all projects in this workspace? (default: `Bucks2Bar/` only)
2. Currency: always `$` for this project, or should the assistant support a toggle/localization later? (default: `$`)
3. Accessibility: do you want specific contrast or font-size accessibility constraints enforced? (e.g., minimum contrast ratio)

Next steps
1. Confirm answers to the open questions above.
2. If confirmed, the assistant can:
   - Add this file to the repo (done).
   - Create a `README.md` with a short developer note describing these UI conventions.
   - Run a quick preview (instructions to open `Bucks2Bar/index.html` in a browser) and make micro-adjustments.

If you want these rules converted into a different instruction file format (e.g., `.instructions.md`, `copilot-instructions.md`, or an agent file), tell me which filename to use and I will create it.


### UI Specification
All buttons must be pink color