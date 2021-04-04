import logo from "./logo.svg";
import "./App.css";

import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import Routes from "./Routes";

import Sidebar from "./components/Sidebar";

import Loader from "./components/Loader";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Sidebar />
        <div>
          <Switch>
            <Suspense fallback={<Loader pageCentered />}>
              {Routes.map((route: any) => (
                <Route exact path={route.path} key={route.path}>
                  <route.component />
                </Route>
              ))}
            </Suspense>
          </Switch>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
