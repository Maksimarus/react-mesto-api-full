import Popup from './Popup';

const ImagePopup = ({card, onClose}) => {
  return (
    <Popup isOpen={card} onClose={onClose} name="open-image">
      <figure className="popup-figure">
        <img className="popup-figure__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup-figure__figcaption">{card?.name}</figcaption>
      </figure>
    </Popup>
  );
};

export default ImagePopup;
