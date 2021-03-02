import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

export default function App() {
  return (
    <Router>
      <Header brand="RantMap" color="light" />
      <Route exact path="/" component={Home} />
      <Route path="/restaurant/:id" component={Restaurant} />
      <Footer />
    </Router>
  );
}
