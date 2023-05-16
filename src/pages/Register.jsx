import React, { useState } from 'react';
import Header from './../components/Header';
import MyForm from '../components/MyForm';
import { Link, useNavigate } from 'react-router-dom';
import { apiAuth } from '../utils/Api';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();
    try {
      const res = await apiAuth.singup({
        email,
        password,
      });
      if (res.data) {
        setTimeout(async () => {
          const token = await apiAuth.singin({
            email,
            password,
          });
          localStorage.setItem('TOKEN', token.token);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      <Header btnText="Войти" link="/signin" />
      <div className="myForm__Container">
        <MyForm
          buttonText={'Зарегистрироваться'}
          name={'register'}
          onSubmit={submitHandle}
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
