import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Map from "./pages/Map";

export default function App() {
  return (
    <Router>
      <Header brand="RantMap" color="light" />
      <Route exact path="/" component={Home} />
      <Route path="/map" component={Map} />
      <Footer />
    </Router>
  );
}
