import '../Styles/Card.css'

export default function Card({titre,categorie,image}){
    return(
        <div className="Card">
            <img src={image} alt="" />
            <div className='bloc-Card'>
                <p className='titre'>{titre}</p>
                <p className='categorie'>{categorie}</p>
            </div>
        </div>
    )
}