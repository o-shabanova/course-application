import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import fs from "fs";
import path from "path";

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

const componentRelPath = "src/components/Header/Header.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let Header: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    Header = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("Header (presence)", () => {
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

    if (typeof Header !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof Header === "function" &&
    describe('Header', () => {
    let navigateMock = jest.fn();

    beforeEach(() => {
      (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });

    afterEach(() => {
      localStorage.clear();
      jest.resetAllMocks();
    });

    it('does not show username or logout if no token', () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(screen.queryByText('John')).toBeNull();
      expect(screen.queryByText(/logout/i)).toBeNull();
    });

    it('shows username and logout if token and user exist', () => {
      localStorage.setItem('token', 'token');
      localStorage.setItem('user', 'John');
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(screen.getByText(/john/i)).toBeInTheDocument()
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    it('removes token and user from localStorage and navigates to /login on logout', () => {
      localStorage.setItem('token', 'token');
      localStorage.setItem('user', 'John');
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByText(/logout/i));
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });

    it('shows logout even if username is missing', () => {
      localStorage.setItem('token', 'token');
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });
  });
