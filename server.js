const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path
  })
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));