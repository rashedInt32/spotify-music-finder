import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import Header from './components/Header';
import RoutesComponent from './routes/routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <RoutesComponent />
      </Router>
    </div>
  );
}

export default App;
