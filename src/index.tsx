import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './container/dashboard';

import './static/css/dashboard.scss';
import './static/css/_row-container.scss';
import './static/css/user-card.scss';
import './static/css/repository-card.scss';
import './static/css/common.scss';

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('root')
);