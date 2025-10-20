import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { MemoryRouter, useNavigate } from 'react-router-dom';

import fs from "fs";
import path from "path";

// required to check if students really used Link component, it's not the best practice in real project tests
// but it's necessary to check requirements
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
    Link: ({ to, children }: any) => (
      <a data-testid="mock-link" href={to}>{children}</a>
    ),
  };
});

const componentRelPath = "src/components/Registration/Registration.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let Registration: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    Registration = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("Registration (presence)", () => {
  it("component file must exist and load correctly", () => {
    if (!fileExists) {
      throw new Error(
        `Required file '${componentRelPath}' is missing (checked at '${componentAbsPath}').`
      );
    }
    if (componentLoadError) {
      throw new Error(
        `Failed to load '${componentRelPath}': ${String(componentLoadError)}`
      );
    }

    if (typeof Registration !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof Registration === "function" &&
    describe('Registration', () => {
      let navigateMock: jest.Mock;

      beforeEach(() => {
        navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        localStorage.clear();
      });

      afterEach(() => {
        jest.resetAllMocks();
        localStorage.clear();
      });

      it('should render name, email, password and button register', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
        expect(screen.getByRole("heading", {name: /registration/i})).toBeInTheDocument()
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /register/i})).toBeInTheDocument()
      });

      it('should use Link component', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
        const link = screen.getByTestId('mock-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/login');
        expect(screen.getByText(/login/i)).toBeInTheDocument()
      })

      it('should allow user to put all necessary data and after submit execute API request and redirect to /login if success', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({ successful: true }),
        }) as any;
        
        const user = userEvent.setup()

        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );

        await user.type(screen.getByLabelText(/name/i), "John")
        await user.type(screen.getByLabelText(/email/i), "john@example.com")
        await user.type(screen.getByLabelText(/password/i), "qwerty")
        const submitButton = screen.getByRole("button", { name: /register/i })
        await user.click(submitButton)

        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:4000/register',
            expect.objectContaining({
              method: 'POST',
              body: JSON.stringify({ name: "John", email: "john@example.com", password: "qwerty" }),
            })
          );
          expect(navigateMock).toHaveBeenCalledWith('/login');
        });
      });

      it('if response is not okay -> redirect should not happen', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: false,
          json: async () => ({ errors: 'Email already used' }),
        }) as any;

        const user = userEvent.setup()

        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );

        await user.type(screen.getByLabelText(/name/i), "John")
        await user.type(screen.getByLabelText(/email/i), "john@example.com")
        await user.type(screen.getByLabelText(/password/i), "qwerty")
        const submitButton = screen.getByRole("button", { name: /register/i })
        await user.click(submitButton)

        await waitFor(() => {
          expect(navigateMock).not.toHaveBeenCalled();
        });
      });
    });
