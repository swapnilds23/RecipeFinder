const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config({path: "variables.env" });
const jwt = require("jsonwebtoken");
//Importing the schema
const Recipe = require('./models/Recipe');
const User = require('./models/User');

//TO allow cross-domain request that is from React-Fontend to GraphQL backend
const cors = require('cors');

//Connect to database
mongoose.connect(process.env.MONGO_URI)
      .then(()=>{
      console.log('DB Connected');
    }).catch((err)=>{
      console.log(err);
    })

//GraphQL Middleware
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const { typeDefs } = require('./Schema.js');
const { resolvers } = require('./Resolvers.js')

//Create schema
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

//initiate the application
const app = express();

const corsOptions = {
  origin:   'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));

//Set up JWT Authentication Middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if(token !== null){
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    }
   catch(err){
     console.log(err);
   }
  }
  next();
});

//Create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}
))

//Connect MongoDB schema with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
      schema,
      context: {
          Recipe,
          User,
          currentUser
      }
  }))
);
const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
  console.log(`Server listening on PORT ${PORT}`);
});
