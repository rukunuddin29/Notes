import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Password from '../../components/Password';
import Navbar from '../../components/Navbar/Navbar';
import { validateEmail } from '../../utils/helper';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
if (!password){
    setError('please enter the password');
    return;
}
setError('');
//login api call
       
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div>
                    <form onSubmit={handleLogin}>
                        <h4>Login</h4>
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
