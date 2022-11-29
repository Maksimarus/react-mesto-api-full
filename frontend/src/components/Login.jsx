import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from '../hooks/useForm';
import auth from '../utils/auth';
import AuthForm from './AuthForm';

const Login = ({setIsAuth}) => {
  const {values, handleChange} = useForm({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {token} = await auth.authorize(values.email, values.password);
      localStorage.setItem('token', token);
      setIsAuth(true);
      history.push('/');
    } catch (error) {
      console.error(error);
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
        title="Вход"
        buttonText="Войти"
      />
    </div>
  );
};

export default Login;
