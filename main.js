// import core dependencies
const path = require("path");

// import URI
// const URI = "mongodb+srv://ali:QtEZDfatNRHiemub@node-cluster.2dvptbq.mongodb.net/";

// import 3rd party dependencies
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// import relative dependencies
const { server } = require('./config/config');
const { connectDB } = require('./db/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movie.routes');
const actorRoutes = require('./routes/actor.routes');
const directorRoutes = require('./routes/diretor.routes');
const reviewRoutes = require('./routes/review.routes');
const genreRoutes = require('./routes/genre.routes');
const {errorHandler} = require("./middlewares/error.middleware");

// initialize express object
const app = express();

// create the middlewares

// 1. Core and 3rd party middlewares

    // 1. use Cors to deal with cross-origin requests
app.use(cors());

    // 2.  Parse all incoming http requests
app.use(bodyparser.json());

    // 3. Parse incoming url-encoded data
app.use(bodyparser.urlencoded({extended: true}));

    // 4. serve the public directory statically by express so it becomes accessible by public users
app.use(express.static(path.join(__dirname, "public")));

// 2. Routes Middlewares
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/actor', actorRoutes);
app.use('/director', directorRoutes);
app.use('/genre', genreRoutes);
app.use('/review', reviewRoutes);


// 3. Error Handling Middleware
app.use(errorHandler);

// 4. initiate the server
const startServer = async () => {
    try {
        await connectDB(); // wait for mongodb connection
        return app.listen(server.port, () => {
            console.log(`Server Started on port: ${server.port}`);
        })
    } catch (err) {
        console.log(err);
    }
}

// call the server function
startServer();