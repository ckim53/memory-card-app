import { useState, useEffect } from "react";
import Card from "./Card";
import '../styles/styles.css'

let charNames = [
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
    "Ty Lee",
    "Mai"
  ];

let clickedIds = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function Cards () {
    const [names, setNames] = useState(charNames);
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);

    async function fetchData (name) {
        const res = await fetch('https://last-airbender-api.fly.dev/api/v1/characters?name=' + name);
        const data = await res.json();
        const filteredData = data.filter( element => 
            !element.name.includes("(") && 
            !element.name.includes(")") && 
            !element.name.includes("\'")
        );

        return { name: filteredData[0].name,
                url: filteredData[0].photoUrl,
                id: filteredData[0]._id
            }
    }

    async function fetchAll(promises) {
        const results = await Promise.all(promises);
        setData(results);
    }

    useEffect(() => {
        (async () => {
            const promises = names.map(name => fetchData(name));
            await fetchAll(promises);
        })();
        const savedScroll = sessionStorage.getItem("scrollPosition");
        if (savedScroll) {
        window.scrollTo({ top: parseInt(savedScroll), behavior: "auto" });
        }
    }, [names]);

    
    function handleClick(id) {
        const y = window.scrollY;
        sessionStorage.setItem("scrollPosition", y);
        if (clickedIds.includes(id)) {
            clickedIds = [];
            setScore(0);
        }
        else {
            clickedIds.push(id);
            setScore(score + 1);
        }
        const shuffledNames = shuffleArray([...names]);
        setNames(shuffledNames);
    }

    return (
        <>
        <div id="score">
            Score: {score}
        </div>
        <div className='card-grid'>
            {names.map(name => {
                const element = data.find(obj => obj.name === name);
                if (!element) return null;
                return (
                    <Card key={element.id} 
                    name={element.name} 
                    url={element.url} 
                    onClick={() => handleClick(element.id)}>    
                    </Card>
                );
            })}
        </div>
        </>
    );
}