import React, { useState, useEffect } from 'react';
import Header from './../components/Header';
import MyForm from '../components/UI/MyForm';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLoginSubmit, isAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  async function submitHandle(e) {
    handleLoginSubmit(e, email, password);
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
          buttonText={'Войти'}
          name={'register'}
          onSubmit={submitHandle}
          title={'Вход'}
        >
          <label className="form__field">
            <input
              className="form__input form__input_type_name"
              type="text"
              name="name"
              id="form-login__input-name"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={onChangeEmail}
              value={email || ''}
              autoComplete="off"
            />
            <span className="form__input-error form__input-name-error" />
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_password"
              onChange={onChangePassword}
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
      </div>
    </>
  );
};

export default Login;
