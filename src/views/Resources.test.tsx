import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Resources from "./Resources";

describe("Resources Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Resources />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Resources />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible search input", () => {
    const { container } = renderWithProviders(<Resources />);
    const searchInput = container.querySelector(
      'input[type="text"], input[type="search"]'
    );

    if (searchInput) {
      const id = searchInput.getAttribute("id");
      const ariaLabel = searchInput.getAttribute("aria-label");
      const ariaLabelledBy = searchInput.getAttribute("aria-labelledby");

      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  it("should have accessible resource links", () => {
    const { container } = renderWithProviders(<Resources />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have proper ARIA attributes for interactive elements", () => {
    const { container } = renderWithProviders(<Resources />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });
});
