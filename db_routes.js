const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
const mongoClient = require('mongodb').MongoClient;

module.exports = async (app) => {
  const db = await mongoClient.connect(url).catch((err) => { console.log(err); });

  app.get('/api/search', (req, res) => {
    const regexQuery = new RegExp(req.query.q, 'i');
    db.collection('Titles')
      .find({ TitleName: regexQuery })
      .toArray()
      .then((matches) => {
        res.send(JSON.stringify(matches));
      });
  });
};
