import { describe, it } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Contact from "./Contact";

describe("Contact Violations", () => {
  it("should show detailed violations", async () => {
    const { container } = renderWithProviders(<Contact />);

    // Remove iframes from the container to prevent axe-core from scanning them
    // Google Maps iframe is cross-origin and causes test failures
    const iframes = container.querySelectorAll("iframe");
    iframes.forEach((iframe) => iframe.remove());

    const results = await testAccessibility(container);

    console.log("\n=== Contact Page Accessibility Violations ===\n");

    if (results.violations.length === 0) {
      console.log("✅ No accessibility violations found in Contact page!");
    } else {
      results.violations.forEach((violation) => {
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
