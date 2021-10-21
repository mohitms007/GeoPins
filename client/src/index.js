import React, {useContext, useReducer} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from "./pages/App";
import Splash from "./pages/Splash";
import ProtectedRoute from './ProtectedRoute'
import Context from './context'
import reducer from './reducer'
import "mapbox-gl/dist/mapbox-gl.css";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import {InMemoryCache } from 'apollo-cache-inmemory' 
import * as serviceWorker from "./serviceWorker";


const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
        reconnect: true
    }
})

const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache()
})


const Root = () => {
    const intitalState = useContext(Context)
    const [state,
        dispatch] = useReducer(reducer, intitalState)
        // console.log(state)
    return (
        <Router>
            <ApolloProvider client={client}>
            <Context.Provider value={{state, dispatch}}>
                <Switch>
                    <ProtectedRoute exact path="/" component={App}/>
                    <Route path="/login" component={Splash}/>
                </Switch>
            </Context.Provider>
            </ApolloProvider>
        </Router>
    );
};

ReactDOM.render(
    <Root/>, document.getElementById("root"));
    
serviceWorker.unregister();
