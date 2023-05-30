const mongoose = require("mongoose");
const config = require("../config/config");


// Mongoose Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
// Mongoose Connection URI
const dbUri = config.database.dbUri;
let connection = null;


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(dbUri, options);

        console.log({"MongoDB Connected: " : connection.connection.host});

        return connection;

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
};

module.exports = {
    connectDB,
};