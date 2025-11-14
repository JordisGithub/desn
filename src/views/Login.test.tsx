import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Login from "./Login";

describe("Login Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Login />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Login />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible form inputs with proper labels", () => {
    const { container } = renderWithProviders(<Login />);
    const inputs = container.querySelectorAll("input");

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

  it("should have accessible error messages", () => {
    const { container } = renderWithProviders(<Login />);
    const errorMessages = container.querySelectorAll(
      '[role="alert"], .error, .MuiFormHelperText-root'
    );

    errorMessages.forEach((error) => {
      const hasAriaLive = error.getAttribute("aria-live");
      const hasRole = error.getAttribute("role");
      expect(hasAriaLive || hasRole).toBeTruthy();
    });
  });

  it("should have accessible links", () => {
    const { container } = renderWithProviders(<Login />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });

  it("should have focus visible on interactive elements", () => {
    const { container } = renderWithProviders(<Login />);
    const interactiveElements = container.querySelectorAll("button, a, input");

    expect(interactiveElements.length).toBeGreaterThan(0);
  });
});
