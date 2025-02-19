import React, { useState } from 'react';
import '../pages/auth.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setformData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('error').innerText = 'Invalid email';
            return false;
        }
        return true;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }

    const validatePassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            document.getElementById('error').innerText = 'Passwords do not match';
            return false;
        }
        return true;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(formData);
        if (validateEmail(formData.email) && validatePassword(formData.password, formData.confirmPassword)) {
            document.getElementById('error').innerText = '';
            try {
                const response = await fetch('http://localhost:5000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        surname: formData.surname,
                        email: formData.email,
                        password: formData.password
                    })
                });
                if (!response.ok) {
                    throw new Error('An error occurred. Please try again later.');
                }

                const { token, user } = response.ok ? await response.json() : { token: null, user: null };
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = '/';

                const data = await response.json();
                console.log(data);
                if (data.success) {
                    alert('Signup successful');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                document.getElementById('error').innerText = 'An error occurred. Please try again later.';
                console.error('Error:', error);
            }
        }
        setSubmitting(false);
    }

    return (
        <div className='mt-10'>
            <h2 className='text-xl mb-4 font-bold'>Signup</h2>
            <form method="post" onSubmit={handleFormSubmit} className="form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Surname:</label>
                    <input type="text" name="surname" value={formData.surname} required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} required onChange={handleInputChange} />
                </div>
                <button type="submit">{submitting ? <i className="fa fa-spinner fa-spin-pulse"></i> : "Signup"}</button>
                <p className='text-red-600' id='error'></p>
                <br />
                Already have an account? - <Link to={'/auth/login'}>Login</Link>
            </form>
        </div>
    );
};

export default Signup;