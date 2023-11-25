import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Vans = () => {
    const [vansInfo, setVansInfo] = useState([]);
    useEffect(() => {
        async function fetchVans() {
            try {
                const res = await fetch('./api/vans');
                const data = await res.json();
                setVansInfo(data.vans);
            } catch (error) {
                console.error(error);
            }
        }
        fetchVans();
    }, []);

    const vanElements = vansInfo.map((van) => (
        <div key={van.id} className='van-tile'>
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} />
                <div className='van-info'>
                    <h3>{van.name}</h3>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));
    return (
        <div className='van-list-container'>
            <h1>Expore our van options</h1>
            <div className='van-list'>{vanElements}</div>
        </div>
    );
};

export default Vans;
