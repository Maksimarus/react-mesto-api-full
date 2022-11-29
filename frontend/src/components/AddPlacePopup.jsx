import {useEffect} from 'react';
import {useForm} from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
  const {values, handleChange, setValues} = useForm({name: '', link: ''});
  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace(values);
  };
  useEffect(() => {
    setValues({name: '', link: ''});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        name="name"
        className="popup__input"
        type="text"
        id="placeTitle-input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__input-error placeTitle-input-error"></span>
      <input
        name="link"
        className="popup__input"
        type="url"
        id="placeUrl-input"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="popup__input-error placeUrl-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
