const {ApolloServer} = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");

const typedefs = require("./typeDefs");
const resolvers = require("./resolvers");
const {findOrCreateUser} = require('./controllers/userController')

mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log(err));

const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: resolvers,
    context: async ({req}) => {
        let authToken = null
		let currentUser = null

        try {
            authToken = req.headers.authorization
            if (authToken) {
				currentUser = await findOrCreateUser(authToken)
			}
        } catch (err) {
            console.error(`Unable to authenticate user with token ${authToken}`)
        }
		return { currentUser }
    }
});

server
    .listen()
    .then(({url}) => {
        console.log(`Server Listening on ${url}`);
    });

