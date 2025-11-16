import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Programs from "./Programs";
import { testAccessibility } from "../test/test-utils";

describe("Programs Violations", () => {
  it("should show detailed violations", async () => {
    const { container } = render(
      <BrowserRouter>
        <Programs />
      </BrowserRouter>
    );

    const results = await testAccessibility(container);

    if (results.violations.length > 0) {
      console.log("\n=== Programs Page Accessibility Violations ===\n");
      results.violations.forEach((violation) => {
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Nodes affected: ${violation.nodes.length}\n`);

        violation.nodes.forEach((node, index) => {
          console.log(`  Node ${index + 1}:`);
          console.log(`  HTML: ${node.html}`);
          console.log(`  Target: ${node.target.join(", ")}\n`);
        });
      });
    } else {
      console.log("✅ No accessibility violations found in Programs!");
    }
  });
});
