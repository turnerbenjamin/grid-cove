import { AppContextProvider } from "./hooks/contexts/appContext";
import Header from "./components/header/Header";
import GridCoveRouter from "./router/GridCoveRouter";

function App() {
  return (
    <AppContextProvider>
      <div className="bg-secondary-900 h-full min-h-screen overflow-x-hidden grid grid-rows-[auto_1fr]">
        <Header />
        <GridCoveRouter />
      </div>
    </AppContextProvider>
  );
}

export default App;
