import React from 'react'
import { Link } from 'react-router-dom';

function Headers() {
  return (

      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/survey">Questionnaire</Link>
      </nav>
  
  );
}

export default Headers
