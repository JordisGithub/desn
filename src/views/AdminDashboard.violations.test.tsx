import { describe, it, beforeEach } from "vitest";
import { renderWithProviders } from "../test/test-utils";
import AdminDashboard from "./AdminDashboard";
import axe from "axe-core";

describe("Admin Dashboard Violations", () => {
  beforeEach(() => {
    const adminUser = {
      username: "admin",
      email: "admin@test.com",
      fullName: "Admin User",
      role: "ADMIN",
      token: "test-token",
    };
    localStorage.setItem("user", JSON.stringify(adminUser));
  });

  it("should show detailed violations", async () => {
    const { container } = renderWithProviders(<AdminDashboard />);

    const results = await axe.run(container);

    if (results.violations.length > 0) {
      console.log("\n=== AdminDashboard Accessibility Violations ===");
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
      console.log("\n✅ No accessibility violations found in AdminDashboard!");
    }
  });
});
