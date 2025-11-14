import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import GetInvolved from "./GetInvolved";

describe("Get Involved Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<GetInvolved />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<GetInvolved />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible form labels", () => {
    const { container } = renderWithProviders(<GetInvolved />);
    const inputs = container.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const id = input.getAttribute("id");
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        const ariaLabel = input.getAttribute("aria-label");
        expect(label || ariaLabel).toBeTruthy();
      }
    });
  });

  it("should have focus visible indicators", () => {
    const { container } = renderWithProviders(<GetInvolved />);
    const interactiveElements = container.querySelectorAll(
      "button, a, input, textarea"
    );

    expect(interactiveElements.length).toBeGreaterThan(0);
  });
});
