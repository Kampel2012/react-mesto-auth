import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import MyForm from '../components/UI/MyForm';
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

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="form__Container">
        <MyForm
          buttonText={'Зарегистрироваться'}
          name={'register'}
          onSubmit={handleSubmit}
          title={'Регистрация'}
        >
          <label className="form__field">
            <input
              className="form__input form__input_type_email"
              type="text"
              name="email"
              id="form-register__input-email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={onChangeEmail}
              value={email || ''}
              autoComplete="off"
            />
            <span className="form__input-error form__input-email-error" />
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_password"
              onChange={onChangePassword}
              type="password"
              name="password"
              id="form-register__input-password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              value={password || ''}
              autoComplete="off"
            />
            <span className="form__input-error form__input-password-error" />
          </label>
        </MyForm>
        <p className="form__text_under">
          Уже зарегистрированы?{' '}
          {
            <Link to={'/sign-in'} className="form__link">
              Войти
            </Link>
          }
        </p>
      </div>
    </>
  );
};

export default Register;
