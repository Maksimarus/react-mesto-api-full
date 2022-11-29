import {useEffect} from 'react';

const Popup = ({onClose, isOpen, name, children}) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_role_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}>
      <div className={`popup__container popup__container_role_${name}`}>
        {children}
        <button className="button popup__close-button" type="button" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
