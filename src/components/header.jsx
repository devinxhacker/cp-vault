import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const role = (localStorage.getItem('user')) ? 'user' : (localStorage.getItem('admin')) ? 'admin' : null;
    if (role) {
        if (role === 'user') {
            return (
                <div>
                    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white p-4'>
                        <nav className='container mx-auto flex justify-between'>
                            <ul className='flex gap-4'>
                                <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
                                <li className='cursor-pointer'><Link to={'/about'}>About</Link></li>
                                <li className='cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
                            </ul>
                            <ul className='flex gap-4 float-right'>
                                <li className='cursor-pointer'><Link to={'/user'}>Dashboard</Link></li>
                                <li className='cursor-pointer'><Link to={'/auth/logout'}>Logout</Link></li>
                            </ul>
                        </nav>
                    </header>
                </div>
            )
        }
        else if (role === 'admin') {
            return (
                <div>
                    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white p-4'>
                        <nav className='container mx-auto flex justify-between'>
                            <ul className='flex gap-4'>
                                <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
                                <li className='cursor-pointer'><Link to={'/about'}>About</Link></li>
                                <li className='cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
                            </ul>
                            <ul className='flex gap-4 float-right'>
                                <li className='cursor-pointer'><Link to={'/admin'}>Dashboard</Link></li>
                                <li className='cursor-pointer'><Link to={'/auth/logout'}>Logout</Link></li>
                            </ul>
                        </nav>
                    </header>
                </div>
            )
        }
    }

    else {
        return (
            <div>
                <header className='fixed top-0 left-0 w-full bg-gray-800 text-white p-4'>
                    <nav className='container mx-auto flex justify-between'>
                        <ul className='flex gap-4'>
                            <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
                            <li className='cursor-pointer'><Link to={'/about'}>About</Link></li>
                            <li className='cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
                        </ul>
                        <ul className='flex gap-4 float-right'>
                            <li className='cursor-pointer'><Link to={'/auth/login'}>Login</Link></li>
                            <li className='cursor-pointer'><Link to={'/auth/signup'}>Register</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}
