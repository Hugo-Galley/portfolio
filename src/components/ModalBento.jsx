import '../Styles/ModalBento.css';
import CloseModalButton from './CloseModalButton';

export default function ModalBento({ Title, text, hideModal }) {
    return (
        <article className='modal-card' role='dialog' aria-modal='true' aria-label={Title}>
            <div className='modal-header'>
                <h2 className='modal-title'>{Title}</h2>
                <button type='button' className='close-button' onClick={hideModal} aria-label='Fermer la fenetre'>
                    <CloseModalButton />
                </button>
            </div>
            <p className='modal-text'>{text}</p>
        </article>
    );
}
