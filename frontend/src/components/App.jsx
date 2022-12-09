import {useState, useEffect} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(false);

  useEffect(() => {
		if(!isAuth) return;
    const fetchCards = async () => {
      try {
        const initialCards = await api.getInitialCards();
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCards();
  }, [isAuth]);

  useEffect(() => {
		if(!isAuth) return;
    const fetchUser = async () => {
      try {
        const user = await api.getUser();
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [isAuth]);

	useEffect(() => {
		const handleAuth = async () => {
			const me = await auth.getMe();
			setUserEmail(me.email);
			setIsAuth(true);
			history.push('/');
		}
		handleAuth();
	}, []);

  const handleCardClick = card => {
    setSelectedCard(card);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleDeleteCardClick = card => {
    setCurrentCard(card);
    setIsDeleteCardPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = async ({name, about}) => {
    setIsLoading(true);
    try {
      const newUserData = await api.updateUserInfo({name, about});
      setCurrentUser(newUserData);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateAvatar = async avatar => {
    setIsLoading(true);
    try {
      const newUserData = await api.updateUserAvatar(avatar);
      setCurrentUser(newUserData);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCardLike = async card => {
    const isLiked = card.likes.some(user => user === currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCardDelete = async card => {
    setIsLoading(true);
    try {
      await api.deleteCard(card._id);
      setCards(state => state.filter(c => c._id !== card._id));
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddPlaceSubmit = async ({name, link}) => {
    setIsLoading(true);
    try {
      const newCard = await api.postNewCard({name, link});
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openSuccessTooltip = () => {
    setTooltipStatus(true);
    setIsTooltipOpen(true);
  };
  const openFailTooltip = () => {
    setTooltipStatus(false);
    setIsTooltipOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header setIsAuth={setIsAuth} userEmail={userEmail} />
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            isAuth={isAuth}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-in">
            <Login setIsAuth={setIsAuth} />
          </Route>
          <Route path="/sign-up">
            <Register
              openSuccessTooltip={openSuccessTooltip}
              openFailTooltip={openFailTooltip}
							onClose={closeAllPopups}
            />
          </Route>
          <Route path="*">
            {isAuth ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {isAuth && <Footer />}
        <InfoTooltip
          status={tooltipStatus}
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithConfirm
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={currentCard}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
