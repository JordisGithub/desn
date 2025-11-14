import { describe, it } from "vitest";
import { renderWithProviders } from "../test/test-utils";
import Resources from "./Resources";
import axe from "axe-core";

describe("Resources Violations", () => {
  it("should show detailed violations", async () => {
    const { container } = renderWithProviders(<Resources />);

    const results = await axe.run(container);

    if (results.violations.length > 0) {
      console.log("\n=== Resources Accessibility Violations ===");
      results.violations.forEach((violation) => {
        console.log(`\nRule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Nodes affected: ${violation.nodes.length}`);
        violation.nodes.forEach((node, index) => {
          console.log(`\n  Node ${index + 1}:`);
          console.log(`  HTML: ${node.html}`);
          console.log(`  Target: ${node.target}`);
        });
      });
    } else {
      console.log("\n✅ No accessibility violations found in Resources!");
    }
  });
});
