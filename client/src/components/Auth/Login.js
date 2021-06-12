import React from "react";
import { GoogleLogin } from 'react-google-login'
import { GraphQLClient } from 'graphql-request'
import { withStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
// import Typography from "@material-ui/core/Typography";


export const ME_QUERY = `
{
  me {
    _id
		name
		email
		picture
  }
}
`;
const Login = ({ classes }) => {

    const handleSuccess = async googleUser => {
        try{
            const idToken = googleUser.getAuthResponse().id_token
            const client = new GraphQLClient('http://localhost:4000/graphql', {
                headers: { authorization : idToken}
            })
            const data = await client.request(ME_QUERY)
            console.log({data})
        }catch(err) {
            console.log(err)
        }
       
    }
    return <GoogleLogin clientId=""
                      onSuccess={handleSuccess}
                      isSignedIn={true}/>;
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