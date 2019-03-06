import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import components
import App from './components/App';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import WithSession from './components/withSession';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import  ApolloClient  from 'apollo-boost';
import  { ApolloProvider }  from 'react-apollo';



const client = new ApolloClient ({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
          headers: {
            authorization: token
          }
      })
    },
    onError: ({ networkError }) => {
      if(networkError) {
        console.log('Network Error', networkError);
          // if (networkError.statusCode === 401){
          //   localStorage.removeItem('token');
          // }
        }
      }
});

const Root=({ refetch })=>(
  <Router>
    <Switch>
      <Route path="/"  exact component={App} />
      <Route path="/signin" render={() => <Signin refetch = {refetch} />} />
      <Route path="/signup" render={() => <Signup refetch = {refetch} />} />

      <Redirect to="/" />
     </Switch>
  </Router>
);

const RootWithSession = WithSession(Root);

ReactDOM.render(
<ApolloProvider client = {client}>
    <RootWithSession />
</ApolloProvider> ,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
