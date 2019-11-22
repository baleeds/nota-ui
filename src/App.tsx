import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './common/base/routes';

const App: React.FC = () => {
  return <Router>{renderRoutes(routes)}</Router>;
};

export default App;
