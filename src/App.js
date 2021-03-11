import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import LeagueDetails from './components/LeagueDetails/LeagueDetails';
import Header from "./components/Header/Header";
import bgGrid from './images/bg/football-field-0.png';
import NotFound from './components/NotFound/NotFound';

export const HeaderLeagueBadgeContext = createContext();

function App() {
  const [headerLeagueBadge, setHeaderLeagueBadge] = useState('');

  return (
    <HeaderLeagueBadgeContext.Provider value={[headerLeagueBadge, setHeaderLeagueBadge]}>
      <div className="App" style={{backgroundImage: `url('${bgGrid}')`}}>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/league/:idLeague/details">
                <LeagueDetails />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
        </Router>
      </div>
    </HeaderLeagueBadgeContext.Provider>
  );
}

export default App;
