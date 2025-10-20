import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import { mockedCoursesList } from '@/constants';

import fs from "fs";
import path from "path";

// required to check if students really used Link component, it's not the best practice in real project tests
// but it's necessary to check requirements
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: jest.fn(),
    Link: ({ to, children }: any) => (
      <a data-testid="mock-link" href={to}>{children}</a>
    ),
  };
});

const componentRelPath = "src/components/Courses/Courses.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let Courses: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    Courses = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("Courses (presence)", () => {
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

    if (typeof Courses !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof Courses === "function" &&
  describe('Courses', () => {
    it('should use Link component', () => {
      render(
        <MemoryRouter>
          <Courses />
        </MemoryRouter>
      );
      const link = screen.getAllByTestId('mock-link')[0];
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/courses/add');
      expect(screen.getByText(/create course/i)).toBeInTheDocument()
    })

    it('should render all courses from mocks', () => {
      render(
        <MemoryRouter>
          <Courses />
        </MemoryRouter>
      );
      const NumberOfCards = mockedCoursesList.length;

      mockedCoursesList.forEach((course, index) => {
        const title = new RegExp(course.title, 'i');
        expect(screen.getByText(title)).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /show course/i });
        const durations = screen.getAllByText(/duration/i);
        const creations = screen.getAllByText(/created/i);
        const authors = screen.getAllByText(/authors/i);

        expect(links).toHaveLength(NumberOfCards);
        expect(durations).toHaveLength(NumberOfCards);
        expect(creations).toHaveLength(NumberOfCards);
        expect(authors).toHaveLength(NumberOfCards);

        expect(screen.getAllByRole('link', { name: /show course/i })[index]).toHaveAttribute('href', `/courses/${course.id}`);
      });
    });
  });
