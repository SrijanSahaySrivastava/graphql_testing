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
        game(_, args){ // Game by ID
            return db.games.find((game) => game.id === args.id);
        },
        reviews (){
            return db.reviews;
        },
        review(_, args){ // Review by ID
            return db.reviews.find((review) => review.id === args.id);
        },
        authors (){
            return db.authors;
        },
        author(_, args){ // Author by ID
            return db.authors.find((author) => author.id === args.id);
        }
    },
    Game: {
        reviews(parent){
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Review: {
        game(parent){
            return db.games.find((game) => game.id === parent.game_id);
        },
        author(parent){
            return db.authors.find((author) => author.id === parent.author_id);
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((review) => review.author_id === parent.id);
        }
    },

    //Mutation
    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter((game) => game.id !== args.id);
            return db.games;
        },
        addGame(_, args){
            let Game = {
                ...args.game,
                id : Math.floor(Math.random() * 1000).toString()
            }
            db.games.push(Game);
            return Game;
        },
        updateGame(_, args){
            db.games = db.games.map((game) => {
                if(game.id === args.id){
                    return {
                        ...game,
                        ...args.edits
                    }
                }
                return game;
                
            });
            return db.games.find((game) => game.id === args.id);
        }
    }
}

//server Setup
const server = new ApolloServer({
    // ... typeDefs and resolvers
    typeDefs,
    resolvers
});

const { url }= await startStandaloneServer(server, { // Starting the server
    listen: {port: 4000} // Port number
});

console.log(`Updated: Server is running at ${url}`); // Server is running at http://localhost:4000/
