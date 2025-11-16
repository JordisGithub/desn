import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VolunteerForm from "../../components/getinvolved/VolunteerForm";
import MembershipSection from "../../components/getinvolved/MembershipSection";
import { LanguageProvider } from "../../contexts/LanguageContext";
import "../../i18n";

// Mock API calls
vi.mock("../../services/ApiService", () => ({
  postWithAuth: vi.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>{component}</LanguageProvider>
    </BrowserRouter>
  );
};

describe("Volunteer Form Error Handling", () => {
  it("should display error summary when submitting empty form", async () => {
    renderWithRouter(<VolunteerForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please correct the following errors/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error for missing full name", async () => {
    renderWithRouter(<VolunteerForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });
  });

  it("should show error for invalid email format", async () => {
    renderWithRouter(<VolunteerForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("should have aria-invalid on fields with errors", async () => {
    renderWithRouter(<VolunteerForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);

      expect(nameInput).toHaveAttribute("aria-invalid", "true");
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("should clear field error when user starts typing", async () => {
    renderWithRouter(<VolunteerForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "J" } });

    await waitFor(() => {
      expect(
        screen.queryByText(/full name is required/i)
      ).not.toBeInTheDocument();
    });
  });

  it("should have role alert on error summary", async () => {
    renderWithRouter(<VolunteerForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute("aria-live", "assertive");
      expect(errorSummary).toHaveAttribute("aria-atomic", "true");
    });
  });
});

describe("Membership Form Error Handling", () => {
  it("should display error summary when submitting empty form", async () => {
    renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    fireEvent.click(openButton);

    const submitButton = screen.getByRole("button", {
      name: /apply for membership/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please correct the following errors/i)
      ).toBeInTheDocument();
    });
  });

  it("should show errors for all required fields", async () => {
    renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    fireEvent.click(openButton);

    const submitButton = screen.getByRole("button", {
      name: /apply for membership/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/email address is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
  });

  it("should validate email format in membership form", async () => {
    renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    fireEvent.click(openButton);

    const nameInput = screen.getAllByLabelText(/full name/i)[0];
    const emailInput = screen.getAllByLabelText(/email address/i)[0];
    const phoneInput = screen.getByLabelText(/phone number/i);

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const submitButton = screen.getByRole("button", {
      name: /apply for membership/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("should have clickable links in error summary", async () => {
    renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    fireEvent.click(openButton);

    const submitButton = screen.getByRole("button", {
      name: /apply for membership/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorLinks = screen.getAllByRole("link");
      expect(errorLinks.length).toBeGreaterThan(0);
      errorLinks.forEach((link) => {
        expect(link).toHaveAttribute("href");
      });
    });
  });

  it("should have proper ARIA attributes on all form fields", async () => {
    renderWithRouter(<MembershipSection />);

    // Open the membership dialog
    const openButton = screen.getByRole("button", { name: /become a member/i });
    fireEvent.click(openButton);

    const submitButton = screen.getByRole("button", {
      name: /apply for membership/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameInput = screen.getAllByLabelText(/full name/i)[0];
      const emailInput = screen.getAllByLabelText(/email address/i)[0];
      const phoneInput = screen.getByLabelText(/phone number/i);

      expect(nameInput).toHaveAttribute("aria-invalid", "true");
      expect(nameInput).toHaveAttribute("aria-describedby");
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
      expect(emailInput).toHaveAttribute("aria-describedby");
      expect(phoneInput).toHaveAttribute("aria-invalid", "true");
      expect(phoneInput).toHaveAttribute("aria-describedby");
    });
  });
});
