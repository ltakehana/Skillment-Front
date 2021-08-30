import '../styles/components/errorModal.css';
import errorImage from '../assets/error.svg'

import Modal from './Modal';


const ErrorModal = ({ isOpen, onClose }) => {
    return (
        isOpen && (
            <Modal onClose={() => {
                onClose()
                window.location.reload()
                }}>
                <div className='errorModalContainer'>
                    <img
                        className='modalImage'
                        src={errorImage}
                        alt="error"
                    />
                    <div className='errorModalTitle'>
                        Ops... Ocorreu um problema!
                    </div>

                    <div className='errorModalText'>
                        Houve um erro de conexão com os servidores tente novamente em alguns segundos.
                    </div>

                    <button
                        className='errorModalButton'
                        onClick={() => {
                            onClose()
                            window.location.reload()
                        }}
                    >
                        Recarregar
                    </button>
                </div>
            </Modal>
        )
    );
}

export default ErrorModal;
