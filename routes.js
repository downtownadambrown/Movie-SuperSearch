const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
// const db = mongoose.connect(url, { useNewUrlParser: true });
const mongoClient = require('mongodb').MongoClient;

module.exports = async (app) => {
    const db = await mongoClient.connect(url).catch(console.error);

    app.get('/api/search', function(req, res){
        const regexQuery = new RegExp(req.query.q);
        console.log('Received Search for ', req.query.q);
        db.collection('Titles')
            .find({ "TitleName" : regexQuery })
            .toArray()
            .then((matches) => {
                console.log('matches found: ', matches);
                res.send(matches)
            });
    });

    app.get('/test', function(req, res) {
        console.log('route test/ hit with: ', req.body);
        res.send({ express: "Connected to React!" });
    });
};