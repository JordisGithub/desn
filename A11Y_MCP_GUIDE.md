# A11y MCP Integration Guide

## Overview

This project uses `a11y-mcp` (Accessibility Model Context Protocol) for comprehensive accessibility testing and monitoring. This guide explains how to use all the tools we've implemented.

## Local Development

### Quick Accessibility Check

While your dev server is running (`npm run dev`), audit the current page:

```bash
npm run a11y:audit
```

This audits `http://localhost:5173` with WCAG 2.2 AA rules.

### Audit All Pages

Run a comprehensive audit of all main pages:

```bash
npm run a11y:audit:all
```

This sequentially audits: Home, About, Programs, Events, Get Involved, Resources, and Contact.

### Audit Individual Pages

Audit specific pages during development:

```bash
npm run a11y:audit:home        # Home page
npm run a11y:audit:about       # About page
npm run a11y:audit:programs    # Programs page
npm run a11y:audit:events      # Events page
npm run a11y:audit:involved    # Get Involved page
npm run a11y:audit:resources   # Resources page
npm run a11y:audit:contact     # Contact page
```

### Get Accessibility Summary

Quick overview of accessibility status:

```bash
npm run a11y:summary
```

## CI/CD Integration

### Pull Request Checks

When you create a PR, three accessibility jobs run automatically:

1. **Accessibility Tests** (accessibility-tests)

   - Runs full Vitest test suite (61 tests)
   - Uses jest-axe with 25+ WCAG rules
   - Fast feedback on test failures

2. **Lighthouse Audit** (lighthouse-audit)

   - Audits 7 main pages with Lighthouse CI
   - Generates detailed performance and accessibility reports
   - Comments on PR with results link

3. **A11y MCP Audit** (a11y-mcp-audit)
   - Detailed axe-core audits with HTML snippets
   - WCAG 2.2 AA compliance verification
   - Comments on PR with violation summary
   - Uploads detailed JSON results as artifacts

### Pre-Deployment Validation

Before deploying to production (on push to `master`):

1. **Pre-deployment-validation job runs:**

   - Full accessibility test suite
   - Builds application
   - Serves built app on localhost:3000
   - Runs a11y-mcp audits on critical pages
   - **Blocks deployment** if critical violations found
   - Uploads audit results

2. **Deploy job only runs if validation passes**

### Production Monitoring

Daily automated monitoring at 2 AM UTC:

1. **Production site scanned:**

   - All 7 main pages audited
   - WCAG 2.2 AA compliance checked
   - HTML snippets included for debugging

2. **Results analyzed:**

   - Total violations counted
   - Critical/serious issues identified
   - Results uploaded (90-day retention)

3. **Automated responses:**
   - If critical issues found → GitHub issue created
   - Issue includes violation details and affected pages
   - Existing issues updated with new scan results

## Understanding Results

### A11y MCP Output Format

```json
{
  "violations": [
    {
      "id": "color-contrast",
      "impact": "serious",
      "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
      "help": "Elements must have sufficient color contrast",
      "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast",
      "nodes": [
        {
          "html": "<button>Click me</button>",
          "impact": "serious",
          "target": [".button-class"],
          "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 3.2:1"
        }
      ]
    }
  ],
  "passes": [],
  "incomplete": [],
  "inapplicable": []
}
```

### Violation Severity Levels

- **critical**: Major accessibility barrier (e.g., missing alt text on images)
- **serious**: Significant issue (e.g., insufficient color contrast)
- **moderate**: Important but not blocking (e.g., missing aria-label)
- **minor**: Best practice violation (e.g., non-unique IDs)

### Deployment Blocking

Deployment is blocked ONLY for **critical** violations. Serious/moderate/minor violations generate warnings but don't block.

## Workflow Files

### `.github/workflows/accessibility.yml`

- **Trigger**: Push to master/feature branches, PRs to master
- **Jobs**: accessibility-tests, lighthouse-audit, a11y-mcp-audit
- **Purpose**: Continuous accessibility testing

### `.github/workflows/production-monitoring.yml`

- **Trigger**: Daily at 2 AM UTC, manual trigger
- **Jobs**: monitor-production
- **Purpose**: Daily production site monitoring

### `.github/workflows/deploy.yml`

- **Trigger**: Push to master
- **Jobs**: pre-deployment-validation, deploy
- **Purpose**: Block deployments with critical a11y issues

## Troubleshooting

### "No violations found but tests fail"

Check the full test output. The issue might be:

- Test timeout (increase in vitest.config.ts)
- Server not running (ensure dev server is up)
- Port conflict (change port in package.json scripts)

### "Pre-deployment validation failing"

1. Check the workflow logs for specific violations
2. Download the pre-deployment audit artifacts
3. Fix critical issues
4. Re-run the workflow

### "Production monitoring creating duplicate issues"

The workflow checks for existing open issues with labels `accessibility` and `production`. If found, it comments on the existing issue instead of creating a new one.

### Local audit returning errors

Ensure:

```bash
# Dev server is running
npm run dev

# Then in another terminal
npm run a11y:audit
```

## Best Practices

### During Development

1. Run `npm run a11y:audit` after making accessibility changes
2. Fix violations before committing
3. Use `npm run a11y:audit:all` before creating PR

### Before Committing

1. Run full test suite: `npm run test:a11y`
2. Ensure all 61 tests pass
3. Commit with descriptive message

### Pull Request Review

1. Check CI/CD status in PR
2. Review Lighthouse and a11y-mcp comments
3. Download artifacts for detailed analysis
4. Fix violations before merging

### After Deployment

1. Monitor GitHub for automated issue creation
2. Review daily monitoring results
3. Address critical issues immediately
4. Track moderate/minor issues for future sprints

## Additional Resources

- [a11y-mcp npm package](https://www.npmjs.com/package/a11y-mcp)
- [axe-core rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Lighthouse Accessibility Audits](https://developer.chrome.com/docs/lighthouse/accessibility/)

## Quick Reference

| Command                  | Purpose             |
| ------------------------ | ------------------- |
| `npm run a11y:audit`     | Audit current page  |
| `npm run a11y:audit:all` | Audit all pages     |
| `npm run a11y:summary`   | Get quick summary   |
| `npm run test:a11y`      | Run full test suite |

## Support

For questions about accessibility testing:

1. Check this guide first
2. Review ACCESSIBILITY_FEATURES.md
3. Check GitHub workflow logs
4. Contact the development team
