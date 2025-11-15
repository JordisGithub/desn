import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Home from "./Home";

describe("Home Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Home />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Home />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have valid alt text for images", () => {
    const { container } = renderWithProviders(<Home />);
    const images = container.querySelectorAll("img");

    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("should have accessible links", () => {
    const { container } = renderWithProviders(<Home />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have proper landmark regions", () => {
    const { container } = renderWithProviders(<Home />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });
});
