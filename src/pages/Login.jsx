import React, { useState, useContext } from 'react';
import Header from './../components/Header';
import MyForm from '../components/MyForm';
import { apiAuth } from '../utils/Api';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();
    try {
      const token = await apiAuth.singin({
        email,
        password,
      });
      localStorage.setItem('TOKEN', token.token);
      navigate('/');
    } catch (error) {
      console.warn(error);
    }
  }

  const isAuth = useContext(AuthContext);

  return (
    <>
      {isAuth && <Navigate to="/" />}
      <Header btnText="Регистрация" link="/signup" />
      <div className="myForm__Container">
        <MyForm
          buttonText={'Войти'}
          name={'register'}
          onSubmit={submitHandle}
          title={'Вход'}
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
      </div>
    </>
  );
};

export default Login;
