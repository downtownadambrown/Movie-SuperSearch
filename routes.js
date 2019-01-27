const mongoose = require("mongoose");
const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
const db = mongoose.connect(url, { useNewUrlParser: true });

module.exports = (app) => {
    app.get('/api/search', function(req, res){
        db.collection('Titles').find({}).toArray().then((matches) => res.send(matches));
        //res.send({ express: "connected to mongo!" });
    });

    app.get('/test', function(req, res) {
        console.log('route \'test/\' hit with: ', req.body);
        res.send({ express: "Connected to React!" });
    });
};