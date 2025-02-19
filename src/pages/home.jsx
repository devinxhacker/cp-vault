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
                            <div>
                                <ul className="space-y-4">
                                    {list.length === 0 ? (
                                        <li>No data found</li>
                                    ) : (
                                        list.map((item, index) => (
                                            <li className=" rounded-lg shadow-md p-6" key={index}>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="mb-2">{item.description}</p>
                                                <p className="mb-2">Tags: {item.tags.join(', ')}</p>
                                                <p className="mb-2">Date: {item.date}</p>
                                                <p className="mb-2">Time: {item.time}</p>
                                                <div className="mb-2">
                                                    {item.links.map((link, i) => (
                                                        <div key={i} className="mb-2">
                                                            <p className="font-bold">{link.name}</p>
                                                            <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.link}</a>
                                                            <p>{link.description}</p>
                                                        </div>
                                                    ))}
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