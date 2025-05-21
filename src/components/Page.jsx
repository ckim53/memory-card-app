import { useState, useEffect } from "react";
import '../styles/styles.css'

const characterNames = [
    "Zuko",
    "Iroh",
    "Azula",
    "Katara",
    "Suki",
    "Aang",
    "Toph",
    "Sokka",
    "Asami",
    "Kuvira",
    "Bolin",
    "Korra",
    "Appa",
    "Momo",
    "Naga",
  ];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function Page () {
    const [names, setNames] = useState(characterNames);
    const [data, setData] = useState([]);

    async function fetchData (name) {
        try {
            const res = await fetch('https://last-airbender-api.fly.dev/api/v1/characters?name=' + name);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        const filteredData = data.filter( element => 
            !element.name.includes("(") && 
            !element.name.includes(")") && 
            !element.name.includes("\'")
        );

        return { name: filteredData[0].name,
                url: filteredData[0].photoUrl,
                id: filteredData[0].id }
        } catch (error) {
            console.error("Error fetching data for:", name, "\n", error);
        return {
            name: name,
            url: "",
            id: name // fallback ID to keep JSX from breaking
        };
        }
    }

    async function fetchAll(promises) {
        const results = await Promise.all(promises);
        setData(results);
    }

    useEffect(() => {
        const promises = names.map(name => fetchData(name));
        fetchAll(promises);
    }, [names]);

    function handleClick() {
        const characterNames = shuffleArray(characterNames);
        setNames(characterNames);
    }

    return (<div className='card-grid'>
        {data.map(element => (
            <div className='card' key={element.id} onClick={handleClick}>
                <p>{element.name}</p>
                <img src={element.url} alt={element.name}/>    
            </div>
        ))}
    </div>);
}
