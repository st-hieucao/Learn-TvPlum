import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
// import { ThemeProvider } from './components/themes';
// import { DialogProvider } from './components/dialogs/Provider';
// import PortalDialogs from './components/dialogs/PortalDialogs';

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
      {/* <DialogProvider> */}
        {/* <PortalDialogs> */}
          <Router>
            <App />
          </Router>
        {/* </PortalDialogs> */}
      {/* </DialogProvider> */}
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
