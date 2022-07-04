/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : App.js             */
/* Modify   : Vicente Garcia     */
/* Modified : 07/02/2022         */
/* ----------------------------- */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import apollo client module methods
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client';
// Import apollo context module
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
// Define to use GraphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});
// Define authorization context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// Define apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Routes>
              <Route 
                path='/' 
                element={<SearchBooks />} 
              />
              <Route 
                path='/saved' 
                element={<SavedBooks />} 
              />
              <Route 
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>} 
              />
            </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}
export default App;