import React from 'react';

const Footer = (props) => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &#169; {new Date().getFullYear()} Глазунов Антон
      </p>
    </footer>
  );
};

export default Footer;
