import { describe, it } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Home from "./Home";

describe("Home Page Accessibility Violations", () => {
  it("should show detailed violations", async () => {
    const { container } = renderWithProviders(<Home />);
    const results = await testAccessibility(container);

    if (results.violations.length > 0) {
      console.log("\n=== HOME PAGE ACCESSIBILITY VIOLATIONS ===\n");
      results.violations.forEach((violation) => {
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log("Nodes:");
        violation.nodes.forEach((node, idx) => {
          console.log(`  ${idx + 1}. ${node.html.substring(0, 100)}...`);
          console.log(`     Failure: ${node.failureSummary}`);
        });
        console.log("\n");
      });
    }
  });
});
