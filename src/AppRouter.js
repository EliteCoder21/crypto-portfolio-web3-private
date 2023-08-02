"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './settings';
import Assets from './assets'
import AUT from './aut'
import Holdings from './holdings'
import Market from './market'
import OXA from './oxa'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/settings" component={Settings} />
        <Route path="/assets" component={Assets} />
        <Route path="/aut" component={AUT} />
        <Route path="/holdings" component={Holdings} />
        <Route path="/market" component={Market} />
        <Route path="/oxa" component={OXA} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
