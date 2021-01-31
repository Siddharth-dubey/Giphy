import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import * as React from "react";

const Trending = React.lazy(() => import("./Trending"));

function App() {
  return (
    <React.Suspense fallback={"Loasing..."}>
      <Router>
        <Switch>
          <Route path="/trending" component={Trending} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
