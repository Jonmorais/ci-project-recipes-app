import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import './Header.css';

function Header({ titlePage }) {
  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Icone de Perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <div className="header">
        <h2 data-testid="page-title">{ titlePage }</h2>
      </div>
    </header>
  );
}
Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
};

export default Header;

// Pesquisas:
// https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
// https://reactrouter.com/web/api/Hooks/usehistory
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
