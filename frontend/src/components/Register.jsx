import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import auth from '../utils/auth';
import {useForm} from '../hooks/useForm';
import AuthForm from './AuthForm';

const Register = ({openSuccessTooltip, openFailTooltip}) => {
  const {values, handleChange} = useForm({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await auth.register(values.email, values.password);
      openSuccessTooltip();
      setTimeout(() => {
        history.push('/sign-in');
      }, 2000);
    } catch (error) {
      console.error(error);
      openFailTooltip();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <AuthForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleChange={handleChange}
        values={values}
        title="Регистрация"
        buttonText="Зарегистрироваться"
      />
      <Link to="/sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;
