import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home.jsx';
import { Survey } from './pages/Survey.jsx';
import { SurveyProvider, ThemeProvider } from './utils/context/providers.jsx';
import { GlobalStyle } from './utils/style/GlobalStyle.jsx';
import { Header } from './components/Header.jsx';
import { Results } from './pages/Results.jsx';
import { Freelances } from './pages/Freelances.jsx';
import { Error404 } from './pages/Error404.jsx';
import { getRandomProfiles } from './utils/data/randomFreelance.js';
import { Footer } from './components/Footer.jsx';

/**
 * Renders the App component.
 *
 * @return {Promise<void>} No return value.
 */
const App = async () => {
  const profileQuantity = 4 + Math.ceil(Math.random() * 4);
  const freelances = await getRandomProfiles(profileQuantity);

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <Router>
        <ThemeProvider>
          <SurveyProvider>
            <GlobalStyle />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faire-le-test/:questionId" element={<Survey />} />
              <Route
                path="/freelances"
                element={<Freelances freelances={freelances} />}
              />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
            {/* <Footer /> */}
          </SurveyProvider>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
};
App();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
