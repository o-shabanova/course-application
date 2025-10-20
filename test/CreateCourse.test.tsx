import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import fs from "fs";
import path from "path";

const componentRelPath = "src/components/CreateCourse/CreateCourse.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let CreateCourse: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    CreateCourse = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("CreateCourse (presence)", () => {
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

    if (typeof CreateCourse !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof CreateCourse === "function" &&
  describe('CreateCourse', () => {
    it('should render CreateCourse on route `/courses/add`', () => {
      render(
        <MemoryRouter initialEntries={['/courses/add']}>
          <Routes>
            <Route path="/courses/add" element={<CreateCourse />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText(/course edit\/create page/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/author name/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create course/i })).toBeInTheDocument();
    });
  });
