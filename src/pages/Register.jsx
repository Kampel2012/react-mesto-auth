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
      <div className="form__Container">
        <MyForm
          buttonText={'Зарегистрироваться'}
          name={'register'}
          onSubmit={handleSubmit}
          title={'Регистрация'}
        >
          <label className="form__field">
            <input
              className="form__input form__input_type_name"
              type="text"
              name="name"
              id="form__input-name"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ''}
              autoComplete="off"
            />
            <span className="form__input-error form__input-name-error" />
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="form__input-password"
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
