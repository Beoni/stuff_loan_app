import React, { useState, useEffect, useLayoutEffect } from "react";
import './App.css'

const BASE_URL = "http://localhost:3000/stuff"

function App() {
    const [stuff, setStuff] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState(null);
    
    const getStuff = async () => {
        setLoading(true);
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

    // 3. useLayoutEffect laskee ajan, kun DOM on päivitetty uusilla stuff-arvoilla.
    useLayoutEffect(() => {
        // Suorita vain, jos startTime on asetettu (eli napin painallus on tapahtunut)
        // ja stuff-data on päivittynyt (riippuvuuslistan ansiosta).
        if (startTime !== null && stuff.length > 0) {
            const endTime = performance.now();
            const elapsed = endTime - startTime; 

            // Kirjoita renderöintiaika konsoliin
            console.log(`Renderöintiaika (napin painamisesta taulukon päivitykseen): ${elapsed.toFixed(2)} ms`); 

            // Nollaa mittaus seuraavaa painallusta varten
            setStartTime(null); 
        }
    }, [stuff]); // Laukeaa aina, kun stuff-tila muuttuu
    
    useEffect(() => {
        getStuff();
    }, []);
  return (
    <>
      
      <button onClick={getStuff} disabled={isLoading} >
        {isLoading ? 'Haetaan...' : 'Hae uudelleen'}
      </button>
      <div>            
            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Haetaan dataa...</p>
                </div>
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
      
      
    </>
  )
}

export default App
