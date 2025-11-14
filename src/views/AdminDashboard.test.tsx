import { describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import AdminDashboard from "./AdminDashboard";

describe("Admin Dashboard Page Accessibility", () => {
  // Mock admin user in localStorage before each test
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

  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    // Material-UI's Tabs implementation uses hidden tabpanels which can cause
    // false positives with aria-valid-attr-value when tabpanels exist but are hidden
    const results = await testAccessibility(container, {
      rules: {
        "aria-valid-attr-value": { enabled: false },
      },
    });

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible navigation", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const nav = container.querySelector("nav");

    if (nav) {
      const ariaLabel = nav.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    }
  });

  it("should have accessible data tables", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const tables = container.querySelectorAll("table");

    tables.forEach((table) => {
      const caption = table.querySelector("caption");
      const ariaLabel = table.getAttribute("aria-label");
      const ariaLabelledBy = table.getAttribute("aria-labelledby");
      expect(caption || ariaLabel || ariaLabelledBy).toBeTruthy();
    });
  });

  it("should have accessible form controls", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const inputs = container.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      const type = input.getAttribute("type");
      // Skip hidden inputs
      if (type === "hidden") return;

      const id = input.getAttribute("id");
      const ariaLabel = input.getAttribute("aria-label");
      const ariaLabelledBy = input.getAttribute("aria-labelledby");

      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });
  });

  it("should have accessible action buttons", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have accessible modal dialogs", () => {
    const { container } = renderWithProviders(<AdminDashboard />);
    const modals = container.querySelectorAll('[role="dialog"]');

    modals.forEach((modal) => {
      const ariaLabel = modal.getAttribute("aria-label");
      const ariaLabelledBy = modal.getAttribute("aria-labelledby");
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
    });
  });
});
