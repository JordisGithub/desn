import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Programs from "./Programs";

describe("Programs Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Programs />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Programs />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible buttons", () => {
    const { container } = renderWithProviders(<Programs />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      const ariaLabel = button.getAttribute("aria-label");
      const textContent = button.textContent;

      // Button should have either aria-label or visible text
      expect(ariaLabel || textContent).toBeTruthy();
    });
  });

  it("should have proper ARIA attributes", () => {
    const { container } = renderWithProviders(<Programs />);
    const elementsWithAria = container.querySelectorAll(
      "[aria-labelledby], [aria-describedby]"
    );

    elementsWithAria.forEach((element) => {
      const labelledBy = element.getAttribute("aria-labelledby");
      const describedBy = element.getAttribute("aria-describedby");

      if (labelledBy) {
        const referencedElement = container.querySelector(`#${labelledBy}`);
        expect(referencedElement).toBeInTheDocument();
      }

      if (describedBy) {
        const referencedElement = container.querySelector(`#${describedBy}`);
        expect(referencedElement).toBeInTheDocument();
      }
    });
  });
});
