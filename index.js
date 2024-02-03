import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'; // Starting the server

//data
import db from './_db.js'; // Database

//types
import { typeDefs } from './schema.js'; // Schema

//resolvers
const resolvers = {
    Query: {
        games (){
            return db.games;
        },
        reviews (){
            return db.reviews;
        },
        authors (){
            return db.authors;
        }
    }
};

//server Setup
const server = new ApolloServer({
    // ... typeDefs and resolvers
    typeDefs,
    resolvers
});

const { url }= await startStandaloneServer(server, { // Starting the server
    listen: {port: 4000} // Port number
});

console.log(`Server is running at ${url}`); // Server is running at http://localhost:4000/