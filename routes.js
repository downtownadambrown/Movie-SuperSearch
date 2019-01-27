module.exports = function(app) {
    app.get('/api/search', function(req, res){

    });

    app.get('/test', function(req, res) {
        console.log('route \'test/\' hit with: ', req.body);
        res.send({ express: "Connected to React!" });
    });
};