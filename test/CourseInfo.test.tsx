import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
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

const componentRelPath = "src/components/CourseInfo/CourseInfo.tsx";
const componentAbsPath = path.resolve(process.cwd(), componentRelPath);

let CourseInfo: any = null;
let componentLoadError: unknown = null;

const fileExists = fs.existsSync(componentAbsPath);

if (fileExists) {
  try {
    require.resolve(componentAbsPath);
    CourseInfo = require(componentAbsPath).default;
  } catch (e) {
    componentLoadError = e;
  }
}
describe("CourseInfo (presence)", () => {
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

    if (typeof CourseInfo !== "function") {
      throw new Error(
        `'${componentRelPath}' does not export a valid React component as default.`
      );
    }
  });
});

fileExists &&
  !componentLoadError &&
  typeof CourseInfo === "function" &&
  describe('CourseInfo', () => {
    beforeEach(() => {
      (require('react-router-dom') as any).useParams.mockReturnValue({ courseId: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba' });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should find correct course by id and render necessary information', () => {
      render(
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      );
      expect(screen.getByText(/javascript/i)).toBeInTheDocument();
      expect(screen.getByText(/02:40/i)).toBeInTheDocument();
      expect(screen.getByText(/de5aaa59-90f5-4dbc-b8a9-aaf205c551ba/i)).toBeInTheDocument();
      expect(screen.getByText(/lorem ipsum is simply dummy text/i)).toBeInTheDocument();
      expect(screen.getByText(/08.03.2021/i)).toBeInTheDocument();
      expect(screen.getByText(/vasiliy dobkin/i)).toBeInTheDocument();
      expect(screen.getByText(/nicolas kim/i)).toBeInTheDocument();
      expect(screen.getByText(/authors:/i)).toBeInTheDocument();
      expect(screen.getByText(/duration:/i)).toBeInTheDocument();
      expect(screen.getByText(/created:/i)).toBeInTheDocument();
    });

    it('should use Link component', () => {
      render(
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      );
      const link = screen.getByTestId('mock-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/courses');
      expect(screen.getByText(/back/i)).toBeInTheDocument()
    })
  }); 
