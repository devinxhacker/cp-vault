import React, { useEffect, useState } from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import Header from '../components/header';
import Footer from '../components/footer';
import AdminSignup from '../components/adminsignup';
import { Link } from 'react-router-dom';
import './auth.css'

const Auth = ({ authType }) => {
    if (authType === 'logout') {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        window.location.href = '/';
    }

    if (localStorage.getItem('user') || localStorage.getItem('admin')) {
        window.location.href = '/';
    }

    const [isLogin, setIsLogin] = useState(authType);

    useEffect(() => {
        setIsLogin(authType === 'login');
    }, [authType]);

    return (
        <div className='container mx-auto'>
            <Header />

            {/* {authType === 'login' ? <Login /> : authType === 'adminsignup' ? <AdminSignup /> : <Signup />} */}
            {authType === 'login' ? <Login /> : authType === 'adminsignup' ? <AdminSignup /> : <Signup />}
            <Footer />
        </div>
    );
};

export default Auth;