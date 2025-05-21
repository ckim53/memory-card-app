export default function Card ({name, url, onClick}) {
    return (
        <div className='card' onClick={onClick}>
            <p>{name}</p>
            <img src={url} alt={name}/>    
        </div>
    );
}