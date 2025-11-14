import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import MemberDashboard from "./MemberDashboard";

describe("Member Dashboard Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible navigation", () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const nav = container.querySelector("nav");

    if (nav) {
      const ariaLabel = nav.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    }
  });

  it("should have accessible buttons", () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have accessible event cards", () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const cards = container.querySelectorAll('[role="article"], .MuiCard-root');

    cards.forEach((card) => {
      const heading = card.querySelector("h2, h3, h4, h5, h6");
      expect(heading).toBeTruthy();
    });
  });

  it("should have proper ARIA attributes for interactive elements", () => {
    const { container } = renderWithProviders(<MemberDashboard />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });
});
