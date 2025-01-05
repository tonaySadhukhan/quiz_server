const mongoose = require('mongoose');

const mongourl = process.env.mongourl;
if (!mongourl) {
    console.error('MongoDB connection string is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

const con = mongoose.connection;
con.on('connected', () => {
    console.log('connected to mongodb');
});
con.on('error', (error) => {
    console.log(error);
});
con.on('disconnected', () => {
    console.log('disconnected');
});

module.exports = mongoose;