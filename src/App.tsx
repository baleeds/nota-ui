import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './base/routes';
import { ApolloProvider } from 'react-apollo';
import { client } from './base/apollo';
import { AuthProvider } from './components/AuthProvider';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>{renderRoutes(routes)}</Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
