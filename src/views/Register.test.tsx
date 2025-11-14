import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Register from "./Register";

describe("Register Page Accessibility", () => {
  it("should not have any accessibility violations (WCAG 2.2 AA)", async () => {
    const { container } = renderWithProviders(<Register />);
    const results = await testAccessibility(container);

    expect(results.violations).toHaveLength(0);
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<Register />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("should have accessible form inputs with proper labels", () => {
    const { container } = renderWithProviders(<Register />);
    const inputs = container.querySelectorAll("input, select");

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

  it("should have accessible validation error messages", () => {
    const { container } = renderWithProviders(<Register />);
    const errorMessages = container.querySelectorAll(
      '[role="alert"], .error, .MuiFormHelperText-root'
    );

    errorMessages.forEach((error) => {
      const hasAriaLive = error.getAttribute("aria-live");
      const hasRole = error.getAttribute("role");
      expect(hasAriaLive || hasRole).toBeTruthy();
    });
  });

  it("should have accessible password requirements", () => {
    const { container } = renderWithProviders(<Register />);
    const passwordInput = container.querySelector('input[type="password"]');

    if (passwordInput) {
      const ariaDescribedBy = passwordInput.getAttribute("aria-describedby");
      if (ariaDescribedBy) {
        const description = container.querySelector(`#${ariaDescribedBy}`);
        expect(description).toBeInTheDocument();
      }
    }
  });

  it("should have accessible links", () => {
    const { container } = renderWithProviders(<Register />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute("aria-label");
      expect(hasText || hasAriaLabel).toBeTruthy();
    });
  });
});
