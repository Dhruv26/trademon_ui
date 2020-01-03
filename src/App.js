import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home';
import AddPage from './pages/addStockEntry';
import Error from './pages/error';
import Navigation from './components/Navigation';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/add" component={AddPage} />

                    <Route exact path="/error" component={Error} />
                    <Redirect to="/error" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
