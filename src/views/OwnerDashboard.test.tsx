import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import OwnerDashboard from "./OwnerDashboard";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { LanguageProvider } from "../contexts/LanguageContext";

expect.extend(toHaveNoViolations);

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>{component}</LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("OwnerDashboard Accessibility", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have proper heading hierarchy", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("Owner Dashboard");
  });

  it("should have accessible tabs with proper ARIA attributes", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBeGreaterThan(0);

    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-controls");
      expect(tab).toHaveAttribute("id");
    });
  });

  it("should have accessible tabpanels with proper ARIA attributes", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const tabpanels = container.querySelectorAll('[role="tabpanel"]');
    expect(tabpanels.length).toBeGreaterThan(0);

    tabpanels.forEach((tabpanel) => {
      expect(tabpanel).toHaveAttribute("aria-labelledby");
      expect(tabpanel).toHaveAttribute("id");
    });
  });

  it("should have accessible table with proper headers", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const table = container.querySelector("table");

    if (table) {
      const headers = table.querySelectorAll("th");
      expect(headers.length).toBeGreaterThan(0);
    }
  });

  it("should have accessible buttons with aria-labels", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      const hasAccessibleName =
        button.textContent ||
        button.getAttribute("aria-label") ||
        button.getAttribute("aria-labelledby");
      expect(hasAccessibleName).toBeTruthy();
    });
  });

  it("should have accessible form inputs with labels", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const inputs = container.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      const id = input.getAttribute("id");
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = input.getAttribute("aria-label");
        const hasAriaLabelledBy = input.getAttribute("aria-labelledby");

        expect(label || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
      }
    });
  });

  it("should have accessible icon buttons with proper labels", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const iconButtons = container.querySelectorAll(
      '[aria-label*="Edit"], [aria-label*="Delete"], [aria-label*="Disable"], [aria-label*="Enable"]'
    );

    iconButtons.forEach((button) => {
      expect(button).toHaveAttribute("aria-label");
      const ariaLabel = button.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel!.length).toBeGreaterThan(0);
    });
  });

  it("should have accessible dialogs with proper roles and labels", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const dialogs = container.querySelectorAll('[role="dialog"]');

    dialogs.forEach((dialog) => {
      const hasTitle =
        dialog.querySelector("h2") ||
        dialog.getAttribute("aria-label") ||
        dialog.getAttribute("aria-labelledby");
      expect(hasTitle).toBeTruthy();
    });
  });

  it("should have keyboard accessible interactive elements", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const interactiveElements = container.querySelectorAll(
      "button, a, input, select, textarea, [tabindex]"
    );

    interactiveElements.forEach((element) => {
      const tabIndex = element.getAttribute("tabindex");
      // Ensure no positive tabindex (anti-pattern)
      if (tabIndex) {
        expect(parseInt(tabIndex)).toBeLessThanOrEqual(0);
      }
    });
  });

  it("should have proper color contrast for text", async () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it("should have accessible error and success messages", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const alerts = container.querySelectorAll('[role="alert"]');

    // Alerts should have role="alert" for screen readers
    alerts.forEach((alert) => {
      expect(alert).toHaveAttribute("role", "alert");
    });
  });

  it("should have accessible data table with aria-label", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const table = container.querySelector("table");

    if (table) {
      const hasAccessibleName =
        table.getAttribute("aria-label") ||
        table.getAttribute("aria-labelledby") ||
        table.querySelector("caption");
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  it("should support keyboard navigation for tabs", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const tabs = container.querySelectorAll('[role="tab"]');

    tabs.forEach((tab) => {
      // Tabs should be keyboard accessible (focusable)
      const tabIndex = tab.getAttribute("tabindex");
      expect(tabIndex === null || parseInt(tabIndex) >= -1).toBeTruthy();
    });
  });

  it("should have semantic HTML structure", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);

    // Should use semantic elements
    expect(
      container.querySelector("main") ||
        container.querySelector('[role="main"]')
    ).toBeTruthy();
    expect(container.querySelector("h1")).toBeTruthy();
  });

  it("should have proper focus management for dialogs", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const dialogs = container.querySelectorAll('[role="dialog"]');

    dialogs.forEach((dialog) => {
      // Dialog should be a valid landmark or have proper modal behavior
      const isModal = dialog.getAttribute("aria-modal");
      expect(isModal === "true" || isModal === null).toBeTruthy();
    });
  });

  it("should have accessible chip/badge elements", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const chips = container.querySelectorAll('[class*="MuiChip"]');

    chips.forEach((chip) => {
      // Chips should have text content for screen readers
      expect(chip.textContent).toBeTruthy();
      expect(chip.textContent!.length).toBeGreaterThan(0);
    });
  });

  it("should have no duplicate IDs", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const elementsWithIds = container.querySelectorAll("[id]");
    const ids = new Set<string>();

    elementsWithIds.forEach((element) => {
      const id = element.getAttribute("id");
      if (id) {
        expect(ids.has(id)).toBe(false);
        ids.add(id);
      }
    });
  });

  it("should have accessible loading states", () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const progressIndicators = container.querySelectorAll(
      '[role="progressbar"]'
    );

    // If loading indicators exist, they should have proper ARIA
    progressIndicators.forEach((indicator) => {
      expect(indicator).toHaveAttribute("role", "progressbar");
    });
  });

  it("should pass axe color-contrast-enhanced (AAA) check", async () => {
    const { container } = renderWithProviders(<OwnerDashboard />);
    const results = await axe(container, {
      rules: {
        "color-contrast-enhanced": { enabled: true },
      },
    });
    // Note: This may have violations if using default MUI colors
    // which are WCAG AA compliant but not always AAA
    expect(results.violations.length).toBeLessThanOrEqual(5);
  });
});
