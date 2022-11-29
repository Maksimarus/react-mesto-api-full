const AuthForm = ({handleSubmit, values, handleChange, isLoading, title, buttonText}) => {
  return (
    <form name="form-register" className="register__form" onSubmit={handleSubmit}>
      <h2 className="register__title">{title}</h2>
      <input
        name="email"
        className="register__input"
        type="email"
        id="email-input"
        placeholder="Email"
        required
        minLength="4"
        maxLength="30"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        className="register__input"
        type="password"
        id="password-input"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="30"
        value={values.password}
        onChange={handleChange}
      />
      <button className="button register__button" type="submit">
        {isLoading ? 'Загрузка...' : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
