import Header from "./components/header/Header";
import GridCoveRouter from "./router/GridCoveRouter";

function App() {
  return (
    <div className="bg-secondary-900 h-full min-h-screen overflow-x-hidden grid grid-rows-[auto_1fr]">
      <Header />
      <GridCoveRouter />
    </div>
  );
}

export default App;
