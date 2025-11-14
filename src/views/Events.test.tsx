import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Events from "./Events";

describe("Events Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Events />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Events />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible form inputs", () => {
    const { container } = renderWithProviders(<Events />);
    const inputs = container.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      const label = container.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute("aria-label");
      const ariaLabelledBy = input.getAttribute("aria-labelledby");

      // Input should have either a label, aria-label, or aria-labelledby
      expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
    });
  });
});
