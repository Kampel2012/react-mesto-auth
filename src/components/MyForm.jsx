import React from 'react';

const MyForm = ({ onSubmit, name, buttonText, children, title }) => {
  return (
    <>
      <h2 className="myForm__title">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="myForm"
        name={name}
        autoComplete="off"
      >
        <fieldset className="myForm__set">
          {children || ''}
          <button className="myForm__btn" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default MyForm;
