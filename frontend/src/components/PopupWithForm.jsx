import Popup from './Popup';

const PopupWithForm = ({
  children,
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  isLoading,
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <form name={`form-${name}`} className="popup__form" onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="button popup__button" type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : buttonText}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
