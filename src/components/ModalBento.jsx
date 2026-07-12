import '../Styles/ModalBento.css';
import CloseModalButton from './CloseModalButton';

export default function ModalBento({ Title, text, hideModal }) {
    return (
        <article className='modal-card' role='dialog' aria-modal='true' aria-label={Title}>
            <div className='modal-header'>
                <h2 className='modal-title'>{Title}</h2>
                <CloseModalButton onClick={hideModal} ariaLabel="Fermer la fenêtre" />
            </div>
            <p className='modal-text'>{text}</p>
        </article>
    );
}
