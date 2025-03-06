import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        try {
            const response = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            // Redirect to home or dashboard
            history.push('/dashboard'); 
        } catch (error) {
            setError('Login failed. Please check your email and password.');
            console.error('Login failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;