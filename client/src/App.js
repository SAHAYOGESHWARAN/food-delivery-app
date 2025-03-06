import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import OrderTracking from './pages/OrderTracking';
import Notification from './components/Notification';

const App = () => {
    return (
        <Router>
            <Switch>
            <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/restaurants" component={RestaurantList} />
                <Route path="/track-order" component={OrderTracking} />
                <Route path="/profile" component={Profile} />
                <Route path="/admin" component={Admin} />
                <Route path="/dashboard" component={User Dashboard} />
                <Route path="/preferences" component={Preferences} />
            </Switch>
        </Router>
    );
};

export default App;