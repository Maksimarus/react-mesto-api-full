import {useContext, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import {useForm} from '../hooks/useForm';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({name: '', about: ''});
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        name="name"
        className="popup__input"
        type="text"
        id="name-input"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        name="about"
        className="popup__input"
        type="text"
        id="job-input"
        placeholder="Ваша профессия"
        required
        minLength="2"
        maxLength="200"
        value={values.about || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
