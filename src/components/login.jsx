import React from 'react';
import '../pages/auth.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserContext, AdminContext } from '../App';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, setUser } = React.useContext(UserContext);
    const { admin, setAdmin } = React.useContext(AdminContext);
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        document.getElementById('error').innerText = '';
        try {
            const res = await fetch('http://localhost:5000/auth/combinedLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            const { token, user, admin, role } = res.ok ? await res.json() : { token: null, user: null, admin: null, role: null };

            localStorage.setItem("token", token);

            if (role === "user") {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            } else if (role === "admin") {
                setAdmin(admin);
                localStorage.setItem("admin", JSON.stringify(admin));
                navigate("/admin");
            }
            console.log(res);
            alert('Login successful');
            window.location.href = '/';
        }
        catch (error) {
            document.getElementById('error').innerText = error.message;
            console.error('Error:', error);
        }
        setSubmitting(false);
    }


    return (
        <div className="login">
            <h2 className='text-xl mb-4 font-bold'>Login</h2>
            <form method="post" className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} required onChange={handleInputChange} />
                </div>
                <button type="submit">{submitting ? <i className="fa fa-spinner fa-spin-pulse"></i> : "Login"}</button>
                <p className='text-red-600' id='error'></p>
                <br />
                New user? -
                <Link to={'/auth/signup'}>Signup</Link>
            </form>
        </div>
    );
};

export default Login;