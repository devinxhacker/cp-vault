import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const role = (localStorage.getItem('user')) ? 'user' : (localStorage.getItem('admin')) ? 'admin' : null;
    if (role) {
        if (role === 'admin') {
            return (
                <div className='mb-20'>
                    <div className='h-20 bg-blue-900 w-full absolute top-0 left-0 p-10'></div>
                    <header className='fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex text-white p-4 rounded-3xl border-1 border-blue-500 backdrop-blur-xs header'>
                        <nav className='container mx-auto flex justify-between'>
                            <ul className='flex'>
                                <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
                                <li className='cursor-pointer'><Link to={'/about'}>About</Link></li>
                                <li className='cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
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
            <div className='mb-20'>
                <div className='h-20 bg-blue-900 w-full absolute top-0 left-0'></div>
                <header className='fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex text-white p-4 rounded-3xl border-1 border-blue-500 backdrop-blur-xs header'>
                    <nav className='container mx-auto flex justify-between'>
                        <ul className='flex'>
                            <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
                            <li className='cursor-pointer'><Link to={'/about'}>About</Link></li>
                            <li className='cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}
