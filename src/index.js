import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import { createStore } from 'redux';
import rootReducer from './Reducers/rootReducer';

//CSS Normalize
import 'normalize.css';

//Fonts
import WebFont from 'webfontloader';

import App from './Components/App/App.jsx';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

