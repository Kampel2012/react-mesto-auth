import React from 'react';

const MyForm = ({ onSubmit, name, buttonText, children, title }) => {
  return (
    <>
      <h2 className="form__title">{title}</h2>
      <form onSubmit={onSubmit} className="form" name={name} autoComplete="off">
        <fieldset className="form__set">
          {children || ''}
          <button className="form__btn" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default MyForm;
