## Visual Development

### Design Principles
- Structure, nomenclature, and component rules: `guidelines/Guidelines.md` + `guidelines/NOMENCLATURE_GUIDELINES.md`
- Canonical visual tokens (colors, typography, spacing): `src/styles/globals.css` — this is the source of truth, **not** the palette/typography section of `Guidelines.md`, which is stale (describes Poppins/Satoshi + an Indigo/pastel palette; the shipped CSS uses Geist and a "Mercury Warm Ivory" light theme / "Navy" dark theme with an accessibility-adjusted gold accent). Flag this drift to the user rather than trusting `Guidelines.md` for color/type decisions until it's updated.
- When making visual (front-end, UI/UX) changes, always refer to `globals.css` for current tokens and to the Guidelines files for structural/nomenclature rules.

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `src/styles/globals.css` tokens and the Guidelines files
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing
