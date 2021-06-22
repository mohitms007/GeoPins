import React, {useContext} from "react";
import {GoogleLogin} from 'react-google-login'
import {GraphQLClient} from 'graphql-request'
import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import Context from '../../context'
import Typography from '@material-ui/core/Typography'
import { ME_QUERY } from '../../graphql/queries'
require('dotenv').config()



const Login = ({classes}) => {
    const {dispatch} = useContext(Context)
    const handleSuccess = async googleUser => {
        try {
            const idToken = googleUser
                .getAuthResponse()
                .id_token
            const client = new GraphQLClient('http://localhost:4000/graphql', {
                headers: {
                    authorization: idToken
                }
            })
            const {me} = await client.request(ME_QUERY)
            dispatch({type: 'LOGIN_USER', payload: me})
            dispatch({type:"IS_LOGGED_IN", payload: googleUser.isSignedIn()})
        } catch (err) {
            onFailure(err)
        }

    }
    const onFailure = (err) => {
        console.error('Error Logging in', err)
    }

    return (
        <div className={classes.root}>
            <Typography
                component="h1"
                variant="h3"
                gutterBottom
                noWrap
                style={{
                color: 'rgb(66, 133, 244)'
            }}> Welcome To Geopins</Typography>
            <GoogleLogin
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={handleSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                theme="dark"/>
        </div>
    )
};

const styles = {
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
};

export default withStyles(styles)(Login);