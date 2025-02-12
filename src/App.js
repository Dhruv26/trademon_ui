import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomePage from './pages/home';
import AddPage from './pages/addStockEntry';
import Error from './pages/error';
import NavigationBar from './components/navigationBar';
import StockDetails from './pages/stockDetails';
import EditStockEntryPage from './pages/editStockEntry';

import './App.css';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavigationBar />
                <Container>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/add" component={AddPage} />
                        <Route path="/details/:id" component={StockDetails} />
                        <Route exact path="/edit" component={EditStockEntryPage} />

                        <Route exact path="/error" component={Error} />
                        <Redirect to="/error" />
                    </Switch>
                </Container>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
