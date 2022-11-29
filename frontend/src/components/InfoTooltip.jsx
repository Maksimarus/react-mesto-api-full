import success from '../images/success.png';
import fail from '../images/fail.png';
import Popup from './Popup';

const InfoTooltip = ({isOpen, onClose, status}) => {
  return (
    <Popup name="tooltip" isOpen={isOpen} onClose={onClose}>
      <div className="tooltip">
        <img
          className="tooltip__image"
          src={status ? success : fail}
          alt={status ? 'Успех' : 'Неудача'}
        />
        <p className="tooltip__text">
          {status
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
