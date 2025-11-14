import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import About from "./About";

describe("About Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<About />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<About />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have valid alt text for all images", () => {
    const { container } = renderWithProviders(<About />);
    const images = container.querySelectorAll("img");

    images.forEach((img) => {
      const alt = img.getAttribute("alt");
      expect(alt).toBeDefined();
      expect(alt).not.toBe("");
    });
  });

  it("should have accessible links", () => {
    const { container } = renderWithProviders(<About />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const ariaLabel = link.getAttribute("aria-label");
      const textContent = link.textContent;

      // Link should have either aria-label or visible text
      expect(ariaLabel || textContent).toBeTruthy();
    });
  });
});
