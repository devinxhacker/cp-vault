import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data/getAll');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }
            setDataLoading(false);
        };
        fetchData();

    }, []);

    let array = data.data || [];

    const list = [];
    for (let i = array.length - 1; i >= 0; i--) {
        list.push(array[i]);
    }
    return (
        <div>
            <Header />
            <main className='mt-20'>
                <section>
                    <h1>CP-Vault</h1>
                    <div>
                        <h2>Recent Uploads</h2>
                        {dataLoading ? <i className="fa fa-spinner fa-spin"></i> :
                            <div className=''>
                                <ul className="vault-container grid gap-5 p-5">
                                    {list.length === 0 ? (
                                        <li>No data found</li>
                                    ) : (
                                        list.map((item, index) => (
                                            <li className="rounded-lg shadow-md p-6 bg-gray-800 text-white h-fit w-full" key={index}>
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
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        }
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Home;