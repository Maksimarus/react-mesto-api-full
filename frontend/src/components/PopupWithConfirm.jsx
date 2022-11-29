import PopupWithForm from './PopupWithForm';

const PopupWithConfirm = ({isOpen, onClose, onDeleteCard, card, isLoading}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default PopupWithConfirm;
