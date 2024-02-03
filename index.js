import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'; // Starting the server

//server Setup
const server = new ApolloServer({
    // ... typeDefs and resolvers
});

const{ url }= await startStandaloneServer(server, { // Starting the server
    listen: {port: 4000} // Port number
});

console.log(`Server is running at ${url}`); // Server is running at http://localhost:4000/