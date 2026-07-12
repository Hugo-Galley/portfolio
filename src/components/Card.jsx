import '../Styles/Card.css'
import { Link } from 'react-router-dom';

export default function Card({titre,categorie,image,lien}){
    return(
        <Link to={lien} className="Card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <img src={image} alt={titre} width="400" height="220" loading="lazy" decoding="async" />
            <div className='bloc-Card'>
                <p className='titre'>{titre}</p>
                <p className='categorie'>{categorie}</p>
            </div>
        </Link>
    )
}
