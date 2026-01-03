import React, { useState, useEffect } from "react";
const BASE_URL = "http://localhost:3000/stuff"

export default function FetchData() {
    const [isLoading, setLoading] = useState(true);
    const [stuff, setStuff] = useState([]);
    
    const getStuff = async () => {
        try {
            const response = await fetch(BASE_URL);
            const json = await response.json();
            setStuff(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
   
    useEffect(() => {
        getStuff();
    }, []);

    return (
        <div>            
            {isLoading ? (
                <p>Loading...</p> 
            ) : (
                <div>
                    <h1>Tuotelistaus Vite + React</h1>
                    <table style = {{ border: 1, styke: "boarder-collapse: collapse"}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nimi</th>
                                <th>Kuvaus</th>
                                <th>Määrä</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stuff.map((stuff) => (
                                <tr key={stuff.id}>
                                    <td>{stuff.id}</td>
                                    <td>{stuff.name}</td>
                                    <td>{stuff.description}</td>
                                    <td>{stuff.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
       </div>

    )
};
