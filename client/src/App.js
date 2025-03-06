import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const RestaurantList = lazy(() => import('./pages/RestaurantList'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));
const Preferences = lazy(() => import('./pages/Preferences'));

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); 

    return (
        <Router>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/restaurants" component={RestaurantList} />
                        <Route path="/track-order" component={OrderTracking} />
                        <PrivateRoute path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/admin" component={Admin} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/dashboard" component={User Dashboard} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/preferences" component={Preferences} isAuthenticated={isAuthenticated} />
                        <Redirect to="/" />
                    </Switch>
                </ErrorBoundary>
            </Suspense>
        </Router>
    );
};

// Protected Route Component
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default App;