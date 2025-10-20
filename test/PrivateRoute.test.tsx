import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import App from '@/App';

import fs from "fs";
import path from "path";

const componentRelPath = "src/components/PrivateRoute/PrivateRoute.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let PrivateRoute: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    PrivateRoute = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("PrivateRoute (presence)", () => {
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

    if (typeof PrivateRoute !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof PrivateRoute === "function" &&
    describe('PrivateRoute', () => {
      beforeEach(() => {
        localStorage.clear();
      });

      it('should redirect to `/courses` if token is present', () => {
        localStorage.setItem('token', 'MOCK_TOKEN');
        render(<App />);
        expect(screen.getByText(/create course/i)).toBeInTheDocument();
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
      });

      it('should redirect to `/login` if no token', () => {
        render(<App />);
        expect(screen.getByRole("heading", {name: /login/i})).toBeInTheDocument()
      });
    });
