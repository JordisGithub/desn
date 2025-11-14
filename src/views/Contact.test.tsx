import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Contact from "./Contact";

describe("Contact Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Contact />);
    // Run accessibility test with iframe-specific rules disabled
    // Google Maps iframe is cross-origin and cannot be scanned by axe-core
    const results = await testAccessibility(container, {
      rules: {
        "frame-tested": { enabled: false },
      },
    });

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Contact />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible form inputs with proper labels", () => {
    const { container } = renderWithProviders(<Contact />);
    const inputs = container.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const id = input.getAttribute("id");
      const ariaLabel = input.getAttribute("aria-label");
      const ariaLabelledBy = input.getAttribute("aria-labelledby");

      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });
  });

  it("should have accessible links and buttons", () => {
    const { container } = renderWithProviders(<Contact />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have proper landmark regions", () => {
    const { container } = renderWithProviders(<Contact />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});
