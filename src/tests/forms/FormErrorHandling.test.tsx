import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import VolunteerForm from "../../components/getinvolved/VolunteerForm";
import MembershipSection from "../../components/getinvolved/MembershipSection";
import { LanguageProvider } from "../../contexts/LanguageContext";
import i18n from "../../i18n";

// Mock API calls
vi.mock("../../services/ApiService", () => ({
  postWithAuth: vi.fn(),
}));

const renderWithRouter = async (component: React.ReactElement) => {
  // Wait for i18n to be ready before rendering
  await i18n.changeLanguage("en");
  return render(
    <BrowserRouter>
      <LanguageProvider>{component}</LanguageProvider>
    </BrowserRouter>
  );
};

// Helper to submit form directly (MUI Button click doesn't trigger form onSubmit in tests)
const submitForm = () => {
  const form = document.querySelector("form");
  expect(form).toBeInTheDocument();
  const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
  form?.dispatchEvent(submitEvent);
};

// Wait for i18n to be initialized before running tests
beforeAll(async () => {
  // Ensure i18n is fully initialized
  if (!i18n.isInitialized) {
    await i18n.init();
  }
  await i18n.changeLanguage("en");
  // Give a moment for everything to settle
  await new Promise((resolve) => setTimeout(resolve, 100));
});

describe("Volunteer Form Error Handling", () => {
  it("should display error summary when submitting empty form", async () => {
    await renderWithRouter(<VolunteerForm />);

    submitForm();

    await waitFor(
      () => {
        expect(
          screen.getByText(/please correct the following errors/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should show error for missing full name", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<VolunteerForm />);

    const emailInput = screen.getAllByLabelText(/email address/i)[0];
    await user.type(emailInput, "test@example.com");

    submitForm();

    await waitFor(() => {
      const fullNameErrors = screen.getAllByText(/full name is required/i);
      expect(fullNameErrors.length).toBeGreaterThan(0);
    });
  });

  it("should show error for invalid email format", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<VolunteerForm />);

    const nameInput = screen.getAllByLabelText(/full name/i)[0];
    const emailInput = screen.getAllByLabelText(/email address/i)[0];

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "invalid-email");

    submitForm();

    await waitFor(() => {
      const emailErrors = screen.getAllByText(
        /please enter a valid email address/i
      );
      expect(emailErrors.length).toBeGreaterThan(0);
    });
  });

  it("should have aria-invalid on fields with errors", async () => {
    await renderWithRouter(<VolunteerForm />);

    submitForm();

    await waitFor(() => {
      const nameInput = screen.getAllByLabelText(/full name/i)[0];
      const emailInput = screen.getAllByLabelText(/email address/i)[0];

      expect(nameInput).toHaveAttribute("aria-invalid", "true");
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("should clear field error when user starts typing", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<VolunteerForm />);

    submitForm();

    await waitFor(() => {
      expect(
        screen.getAllByText(/full name is required/i).length
      ).toBeGreaterThan(0);
    });

    const nameInput = screen.getAllByLabelText(/full name/i)[0];
    await user.type(nameInput, "J");

    await waitFor(() => {
      // Check that the error is cleared from the field's helper text
      const fieldError = screen.queryByRole("alert", {
        name: /full name is required/i,
      });
      expect(fieldError).not.toBeInTheDocument();
    });
  });

  it("should have role alert on error summary", async () => {
    await renderWithRouter(<VolunteerForm />);

    submitForm();

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      // The error summary Alert (first one) should have aria-live
      const errorSummary = alerts.find((alert) =>
        alert.hasAttribute("aria-live")
      );
      expect(errorSummary).toBeTruthy();
      expect(errorSummary).toHaveAttribute("aria-live", "assertive");
      expect(errorSummary).toHaveAttribute("aria-atomic", "true");
    });
  });
});

describe("Membership Form Error Handling", () => {
  it("should display error summary when submitting empty form", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    await user.click(openButton);

    submitForm();

    await waitFor(() => {
      expect(
        screen.getByText(/please correct the following errors/i)
      ).toBeInTheDocument();
    });
  });

  it("should show errors for all required fields", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    await user.click(openButton);

    submitForm();

    await waitFor(() => {
      const fullNameErrors = screen.getAllByText(/full name is required/i);
      expect(fullNameErrors.length).toBeGreaterThan(0);
      const emailErrors = screen.getAllByText(/email address is required/i);
      expect(emailErrors.length).toBeGreaterThan(0);
      const phoneErrors = screen.getAllByText(/phone number is required/i);
      expect(phoneErrors.length).toBeGreaterThan(0);
    });
  });

  it("should validate email format in membership form", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    await user.click(openButton);

    const nameInput = screen.getAllByLabelText(/full name/i)[0];
    const emailInput = screen.getAllByLabelText(/email address/i)[0];
    const phoneInput = screen.getAllByLabelText(/phone number/i)[0];

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "not-an-email");
    await user.type(phoneInput, "1234567890");

    submitForm();

    await waitFor(() => {
      const emailErrors = screen.getAllByText(
        /please enter a valid email address/i
      );
      expect(emailErrors.length).toBeGreaterThan(0);
    });
  });

  it("should have clickable links in error summary", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    await user.click(openButton);

    submitForm();

    await waitFor(() => {
      const errorLinks = screen.getAllByRole("link");
      expect(errorLinks.length).toBeGreaterThan(0);
      errorLinks.forEach((link) => {
        expect(link).toHaveAttribute("href");
      });
    });
  });

  it("should have proper ARIA attributes on all form fields", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    await user.click(openButton);

    submitForm();

    await waitFor(() => {
      const nameInput = screen.getAllByLabelText(/full name/i)[0];
      const emailInput = screen.getAllByLabelText(/email address/i)[0];
      const phoneInput = screen.getAllByLabelText(/phone number/i)[0];

      expect(nameInput).toHaveAttribute("aria-invalid", "true");
      expect(nameInput).toHaveAttribute("aria-describedby");
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
      expect(emailInput).toHaveAttribute("aria-describedby");
      expect(phoneInput).toHaveAttribute("aria-invalid", "true");
      expect(phoneInput).toHaveAttribute("aria-describedby");
    });
  });
});
