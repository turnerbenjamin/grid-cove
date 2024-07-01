import { render } from "@testing-library/react";
import {
  MemoryRouter,
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

import App from "../src/App";

export const renderWithRouter = (element, elementPath, params) => {
  const PageNavigatedTo = () => {
    const location = useLocation();
    return (
      <div data-testid="pageNavigatedTo" data-location={location.pathname} />
    );
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

export const renderAppWithLocationWrapper = (initialEntries) => {
  const AppWrappedWithLocationData = () => {
    const location = useLocation();
    return (
      <div data-testid="current-location" data-location={location.pathname}>
        <App />
      </div>
    );
  };

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppWrappedWithLocationData />
    </MemoryRouter>
  );
};

export const mockPromise = () => {
  let resolver;
  let rejecter;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  return [promise, resolver, rejecter];
};

export const setUpForModal = () => {
  Object.defineProperty(global.window, "scrollTo", {
    value: () => null,
  });
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
};

export const cleanUpForModal = () => {
  document.body.removeChild(document.getElementById("modal"));
};
