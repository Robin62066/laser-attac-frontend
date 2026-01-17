import { BrowserRouter } from "react-router-dom";
import Router from "./router/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
