import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { AuthProvider } from "../contexts/AuthContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import axe from "axe-core";

// Custom render function that wraps components with necessary providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", ...renderOptions }: CustomRenderOptions = {}
) {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <LanguageProvider>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>{children}</AuthProvider>
        </I18nextProvider>
      </LanguageProvider>
    </BrowserRouter>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Helper function to run accessibility tests
export async function testAccessibility(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      // WCAG 2.2 AA rules
      "color-contrast": { enabled: true },
      "valid-lang": { enabled: true },
      "html-has-lang": { enabled: true },
      "landmark-one-main": { enabled: true },
      "page-has-heading-one": { enabled: true },
      region: { enabled: true },
      bypass: { enabled: true },
      "focus-order-semantics": { enabled: true },
      label: { enabled: true },
      "link-name": { enabled: true },
      "button-name": { enabled: true },
      "image-alt": { enabled: true },
      "input-button-name": { enabled: true },
      "aria-allowed-attr": { enabled: true },
      "aria-required-attr": { enabled: true },
      "aria-valid-attr-value": { enabled: true },
      "aria-valid-attr": { enabled: true },
      "aria-hidden-focus": { enabled: true },
      "heading-order": { enabled: true },
      "duplicate-id": { enabled: true },
      list: { enabled: true },
      listitem: { enabled: true },
    },
  });

  return results;
}

// Re-export everything from testing library
export {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  getByRole,
  getByText,
  getByLabelText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByLabelText,
  queryByTestId,
  findByRole,
  findByText,
  findByLabelText,
  findByTestId,
  within,
  cleanup,
  act,
} from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
