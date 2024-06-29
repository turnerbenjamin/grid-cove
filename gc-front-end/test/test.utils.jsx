import { render } from "@testing-library/react";
import {
  MemoryRouter,
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

export const renderWithRouter = (element, elementPath, params) => {
  const PageNavigatedTo = () => {
    const location = useLocation();
    return <div data-testid="pageNavigatedTo" location={location.pathname} />;
  };

  let initialPath = elementPath;
  if (params) {
    Object.keys(params).forEach((paramName) => {
      initialPath = initialPath.replace(`:${paramName}`, params[paramName]);
    });
  }

  const router = createMemoryRouter(
    [
      { path: elementPath, element },
      { path: "*", element: <PageNavigatedTo /> },
    ],
    {
      initialEntries: [initialPath],
    }
  );

  render(<RouterProvider router={router} />);
};

export const renderAppWithLocationWrapper = () => {
  const WrappedElement = () => {
    const location = useLocation();
    return (
      <div data-testid="current-location" data-pathname={location.pathname}>
        <App />
      </div>
    );
  };

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <WrappedElement>{element}</WrappedElement>
    </MemoryRouter>
  );
};
