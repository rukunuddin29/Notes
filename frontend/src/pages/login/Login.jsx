import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Password from '../../components/Password';
import Navbar from '../../components/Navbar/Navbar';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance'; // Added import for axiosInstance

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Corrected `Navigate` to `navigate`

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setError('Please enter the password.');
            return;
        }
        setError('');

        // Login API call
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard'); // Corrected casing of `navigate`
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Corrected typo
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div>
                    <form onSubmit={handleLogin}>
                        <h4 className="text-lg font-semibold mb-4">Login</h4> {/* Added className */}
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="btn-primary">Login</button>
                        <p className="text-sm text-center mt-4">
                            Not registered yet?{' '}
                            <Link className="text-blue-500" to="/signUp">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
