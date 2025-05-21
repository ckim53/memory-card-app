import {useState} from 'react'

export default function Card () {
    //have each card store images in memory once clicked
    //if a card is clicked, handle by checking if the image id is found in memory
    //if yes, it was already clicked and set score to 0
    const [memory, setMemory] = useState({});

    return (
        <div className="card">
            
        </div>
    );
}   