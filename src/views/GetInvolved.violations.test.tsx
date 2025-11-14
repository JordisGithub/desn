import { describe, it } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import GetInvolved from "./GetInvolved";

describe("GetInvolved Page Violations", () => {
  it("should show violations", async () => {
    const { container } = renderWithProviders(<GetInvolved />);
    const results = await testAccessibility(container);
    
    if (results.violations.length > 0) {
      console.log('\n=== GETINVOLVED VIOLATIONS ===\n');
      results.violations.forEach((v) => {
        console.log(`${v.id}: ${v.help}`);
        v.nodes.forEach((n, i) => console.log(`  ${i+1}. ${n.html.substring(0,100)}`));
      });
    }
  });
});
