import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { store} from './redux/store';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Poppins from './fonts/Poppins/Poppins-Regular.ttf';
import PoppinsBold from './fonts/Poppins/Poppins-Bold.ttf';
import Circe from './fonts/Circe/CRC55.otf';
import CirceBold from './fonts/Circe/Circe-Bold.otf';
// eslint-disable-next-line
const myGlobalCSS = `
@font-face {
  font-family: 'Poppins';
  src: url(${Poppins}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Poppins';
  src: url(${PoppinsBold}) format('truetype');
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'Circe';
  src: url(${Circe}) format('opentype');
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'Circe';
  src: url(${CirceBold}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/react-team-project">
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
