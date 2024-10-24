import '../Styles/Card.css'
import { useNavigate } from 'react-router-dom';

export default function Card({titre,categorie,image,lien}){
    const navigate = useNavigate();
    function handleClick(){
        navigate(lien); 
      };
    return(
        <div className="Card" onClick={handleClick}>
            <img src={image} alt="" />
            <div className='bloc-Card'>
                <p className='titre'>{titre}</p>
                <p className='categorie'>{categorie}</p>
            </div>
        </div>
    )
}