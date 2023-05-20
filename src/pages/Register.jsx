import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import MyForm from '../components/MyForm';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ isAuth, handleRegisterSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  function handleSubmit(e) {
    handleRegisterSubmit(e, email, password);
  }

  return (
    <>
      <Header />
      <div className="myForm__Container">
        <MyForm
          buttonText={'Зарегистрироваться'}
          name={'register'}
          onSubmit={handleSubmit}
          title={'Регистрация'}
        >
          <label className="myForm__field">
            <input
              className="myForm__input myForm__input_type_name"
              type="text"
              name="name"
              id="myForm__input-name"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ''}
              autoComplete="off"
            />
            <span className="myForm__input-error myForm__input-name-error" />
          </label>
          <label className="myForm__field">
            <input
              className="myForm__input myForm__input_type_password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="myForm__input-password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              value={password || ''}
              autoComplete="off"
            />
            <span className="myForm__input-error myForm__input-password-error" />
          </label>
        </MyForm>
        <p className="myForm__text_under">
          Уже зарегистрированы?{' '}
          {
            <Link to={'/sign-in'} className="myForm__link">
              Войти
            </Link>
          }
        </p>
      </div>
    </>
  );
};

export default Register;
