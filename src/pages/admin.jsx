import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const AdminPortal = () => {
    const admin = (localStorage.getItem('admin')) ? JSON.parse(localStorage.getItem('admin')) : window.location.href = '/auth/login';
    const [data, setData] = useState({});
    const [newData, setNewData] = useState({
        title: '',
        description: '',
        tags: [],
        date: '',
        time: '',
        links: [{ name: '', link: '', description: '' }] // Initialize links as an array
    });

    const [Adding, setAdding] = useState(false);
    const [Deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data/getAll');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/data/getAll');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const list = data.data || [];
    const list2 = [];
    for (let i = list.length - 1; i >= 0; i--) {
        list2.push(list[i]);
    }

    const handleAdd = async () => {
        setAdding(true);
        try {
            const response = await fetch('http://localhost:5000/data/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newData.title,
                    description: newData.description,
                    tags: newData.tags,
                    date: newData.date,
                    time: newData.time,
                    links: newData.links
                })
            });
            const data = await response.json();
            setNewData({
                title: '',
                description: '',
                tags: [],
                date: '',
                time: '',
                links: [{ name: '', link: '', description: '' }] // Reset links as an array
            });
            fetchData();
            // alert('Data added successfully');
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
        setAdding(false);
    };

    const handleDelete = async (e) => {
        setDeleting(true);
        try {
            console.log(e.target.parentElement.parentElement.children[0].innerText);
            const response = await fetch('http://localhost:5000/data/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: e.target.parentElement.parentElement.children[0].innerText
                })
            });
            const data = await response.json();
            fetchData();
            // if (data.ok) {
            //     alert('Data deleted successfully');
            // }

        } catch (error) {
            console.error('Error:', error);
        }
        setDeleting(false);
    };


    const handleAddLink = () => {
        setNewData({ ...newData, links: [...newData.links, { name: '', link: '', description: '' }] })
    }

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = [...newData.links];
        updatedLinks[index][field] = value;
        setNewData({ ...newData, links: updatedLinks });
    };

    const handleDeleteLink = (index) => {
        console.log(index);
        const updatedLinks = [...newData.links];
        updatedLinks.splice(index, 1);
        setNewData({ ...newData, links: updatedLinks });
    }

    return (
        <div className="container mx-auto p-8">
            <Header />
            <h1 className="text-3xl font-bold mb-4">Admin  - {admin.name}</h1>

            <div className=" rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={newData.title}
                        onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                        placeholder="Enter title"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={newData.description}
                        onChange={(e) => setNewData({ ...newData, description: e.target.value })}
                        placeholder="Enter description"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="tags"
                        id="tags"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newData.tags}
                        onChange={(e) => setNewData({ ...newData, tags: Array.from(e.target.selectedOptions, option => option.value) })}
                        multiple
                    >
                        <option value="">Select tag</option>
                        <option value="tag1">Tag 1</option>
                        <option value="tag2">Tag 2</option>
                        <option value="tag3">Tag 3</option>
                    </select>
                    <input
                        type="date"
                        value={newData.date}
                        onChange={(e) => setNewData({ ...newData, date: e.target.value })}
                        placeholder="Enter date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="time"
                        value={newData.time}
                        onChange={(e) => setNewData({ ...newData, time: e.target.value })}
                        placeholder="Enter time"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 font-bold mb-2">Links</label>
                    {newData.links.map((link, index) => (
                        <div key={index} className="mb-4 border border-gray-300 rounded-md p-3">
                            <input
                                type="text"
                                value={link.name}
                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                                placeholder="Enter name"
                                className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={link.link}
                                onChange={(e) => handleLinkChange(index, 'link', e.target.value)}
                                placeholder="Enter link"
                                className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={link.description}
                                onChange={(e) => handleLinkChange(index, 'description', e.target.value)}
                                placeholder="Enter description"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleDeleteLink(index)}>
                                -
                            </button>
                        </div>
                    ))}
                    <button onClick={handleAddLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> + </button>
                </div>


                <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    {Adding ? <i className="fa fa-spinner fa-spin"></i> : "Add Data"}
                </button>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Data</h2>
                <ul className="vault-container grid gap-5 p-5">
                    {list2.length === 0 ? (
                        <li>No data found</li>
                    ) : (
                        list2.map((item, index) => (
                            <li
                                className="rounded-lg w-full h-fit shadow-md p-6 bg-gray-800 text-white"
                                key={index}
                            >
                                <div className="flex items-start mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full mr-4 flex items-center justify-center">
                                        {/* Icon representing links/resources */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            {/* A chain icon */}
                                            <path d="M13.5442 10.4558C11.8385 8.75022 9.07316 8.75022 7.36753 10.4558L4.27922 13.5442C2.57359 15.2498 2.57359 18.0152 4.27922 19.7208C5.98485 21.4264 8.75021 21.4264 10.4558 19.7208L12 18.1766" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M10.4558 13.5442C12.1614 15.2498 14.9268 15.2498 16.6324 13.5442L19.7207 10.4558C21.4264 8.75021 21.4264 5.98485 19.7207 4.27922C18.0151 2.57359 15.2497 2.57359 13.5441 4.27922L12 5.82338" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-1 text-left">{item.title}</h3>
                                        <p className="text-gray-400 text-sm text-left">{item.description}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="font-semibold mr-1">Tags:</span>
                                        {item.tags.map((tag, i) => (
                                            <div
                                                key={i}
                                                className="bg-blue-900 text-white px-2 py-1 rounded-md text-sm"
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Date: {item.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Time: {item.time}</p>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-gray-700 pt-4">
                                    <h4 className="font-semibold mb-2">Resources:</h4>
                                    <div className="space-y-3">
                                        {item.links.map((link, i) => (
                                            <div key={i} className="bg-gray-700 p-3 rounded-md">
                                                <p className="font-semibold mb-1 text-left">{link.name}</p>
                                                <a
                                                    href={link.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 text-left hover:underline block mb-1"
                                                >
                                                    {link.link}
                                                </a>
                                                <p className="text-sm text-left text-gray-400">{link.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4 gap-5">
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded mr-2">
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        {Deleting ? <i className="fa fa-spinner fa-spin"></i> : 'Delete'}
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPortal;