import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import OrderTracking from './pages/OrderTracking';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/restaurants" component={RestaurantList} />
                <Route path="/track-order" component={OrderTracking} />
            </Switch>
        </Router>
    );
};

export default App;