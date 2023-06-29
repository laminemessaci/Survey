import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';

/**
 * Survey component that renders a questionnaire.
 * @returns {JSX.Element} The Survey component.
 */
function Survey() {

    const { questionNumber } = useParams();
  return (
    <div>
      {/* Heading */}
      <h1>Questionnaire 🧮</h1>
      <h2>Question {questionNumber}</h2>

      {/* Links to different questionnaires */}
      {/* <Link to="client">Questionnaire Client</Link>
      <Link to="freelance">Questionnaire Freelance</Link> */}

      {/* Render nested routes */}
      <Outlet />
    </div>
  );
}

export default Survey
