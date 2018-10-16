import React from 'react';
import './App.css';
import Explore from './components/Explore.js';
import Photo from './components/Photo';

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router,
  Route,
  } from "react-router-dom";

import Search from './components/Search.js';
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Explore} />
      <Route path="/tag" component={Search} />
      <Route path="/photo/:server/:secret/:id" component={Photo} />
    </div>
  </Router>
)
export default App;


