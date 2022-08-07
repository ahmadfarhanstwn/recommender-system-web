import Footer from "./Components/Footer";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
