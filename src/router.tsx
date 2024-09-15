import { Router, Route } from "@solidjs/router";
import HomeView from "./views/home";
import VaultLayout from "./layouts/vault";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" component={HomeView} />
      <Route path="/vault" component={VaultLayout} />
    </Router>
  )
};

export default AppRouter;
