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

const componentRelPath = "src/components/Login/Login.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let Login: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    Login = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("Login (presence)", () => {
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

    if (typeof Login !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof Login === "function" &&
    describe('Login', () => {
      let navigateMock = jest.fn();

      beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
      });

      afterEach(() => {
        localStorage.clear();
        jest.resetAllMocks();
      });

      it('should render email, password, login button', () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
        expect(screen.getByRole("heading", {name: /login/i})).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /login/i})).toBeInTheDocument()
      });

      it('should use Link component', () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
        const link = screen.getByTestId('mock-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/registration');
        expect(screen.getByText(/registration/i)).toBeInTheDocument()
      })

      it('should send data, receive response, save data (user and token) into localStorage and redirects to /courses', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            result: 'MOCK_TOKEN',
            user: { name: 'John' },
          }),
        }) as any;
        const user = userEvent.setup()

        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );

        await user.type(screen.getByLabelText(/email/i), "john@example.com")
        await user.type(screen.getByLabelText(/password/i), "qwerty")
        const submitButton = screen.getByRole("button", { name: /login/i })
        await user.click(submitButton)

        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:4000/login',
            expect.objectContaining({
              method: 'POST',
              body: JSON.stringify({ email: "john@example.com", password: "qwerty"}),
            })
          );

          expect(localStorage.getItem('token')).toBe('MOCK_TOKEN');
          expect(localStorage.getItem('user')).toBe('John');
          expect(navigateMock).toHaveBeenCalledWith('/courses');
        });
      });
    });
