import {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading}) => {
  const avatarRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        name="avatarInput"
        className="popup__input"
        type="url"
        id="avatar-input"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
