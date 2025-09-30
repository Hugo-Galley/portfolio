import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NotFound.css';

function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="title">404</h1>
        <h2 className="subtitle">Page Non Trouvée</h2>
        <p className="description">
          La page que vous recherchez s'est perdue dans l'espace. 
          Elle a peut-être été déplacée ou n'existe plus.
        </p>
        <Link to="/" className="home-button">
          Retour à la terre ferme
        </Link>
      </div>

    </div>
  );
}

export default NotFound;