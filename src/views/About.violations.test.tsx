import { describe, it } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import About from "./About";

describe("About Violations", () => {
  it("should show detailed violations", async () => {
    const { container } = renderWithProviders(<About />);
    const results = await testAccessibility(container);

    console.log("\n=== About Page Accessibility Violations ===\n");

    if (results.violations.length === 0) {
      console.log("✅ No accessibility violations found in About page!");
    } else {
      results.violations.forEach((violation, index) => {
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Nodes affected: ${violation.nodes.length}\n`);

        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`  Node ${nodeIndex + 1}:`);
          console.log(`  HTML: ${node.html}`);
          console.log(`  Target: ${node.target.join(", ")}`);
          if (node.failureSummary) {
            console.log(`  Summary: ${node.failureSummary}`);
          }
          console.log();
        });
      });
    }
  });
});
