import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Error from './components/Error.jsx';
import './index.css';
import {Home} from './pages/Home.jsx';
import {Survey} from './pages/Survey.jsx';
import reportWebVitals from './reportWebVitals';
import { SurveyProvider, ThemeProvider } from './utils/context/providers.jsx';
import { GlobalStyle } from './utils/style/GlobalStyle.jsx';
import { Header } from './components/Header.jsx';


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
            <Route path="/survey/:questionNumber" element={<Survey />} />
            {/* <Route path="client" element={<ClientForm />} /> */}
            <Route path="*" element={<Error />} />
          </Routes>
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
