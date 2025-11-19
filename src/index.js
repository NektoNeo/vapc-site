import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider 
      reCaptchaKey="6Lez_wIqAAAAANDZXnheT_-h8g30Yq_f7FbqMdHr"
      language="ru"
    >
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
