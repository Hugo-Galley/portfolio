import '../Styles/CardWork.css'

export default function CardWork({nom,boite,img, duré}){
    return(
        <div className="work-container">
        <p className="work-nom">{nom}</p>
        <p className="work-boite">{boite}</p>
        <img src={img} alt={img} />
        <p className="work-durée">{duré}</p>
        </div>
    )
}