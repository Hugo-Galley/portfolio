import '../Styles/ModalBento.css';
import CloseModalButton from './CloseModalButton';

export default function ModalBento({ Title, text, hideModal }) {
    return (
        <div className='ModalBox'>
            <div className='headModal'>
                <h1 id='TitleBento'>{Title}</h1>
                <div id='closeButton' onClick={hideModal}><CloseModalButton /></div>
            </div>
            <p>{text}</p>
        </div>
    );
}