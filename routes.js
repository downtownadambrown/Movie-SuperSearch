const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
// const db = mongoose.connect(url, { useNewUrlParser: true });
const mongoClient = require('mongodb').MongoClient;

module.exports = async (app) => {
    const db = await mongoClient.connect(url).catch(console.error);

    app.get('/api/search', function(req, res){
        const regexQuery = '/*/';
        db.collection('Titles').find({}).toArray().then((matches) => res.send(matches));
        console.log('Mongo was accessed');
    });

    app.get('/test', function(req, res) {
        console.log('route test/ hit with: ', req.body);
        res.send({ express: "Connected to React!" });
    });
};