module.exports = function(app) {
    app.get('/', function(req, res){
        console.log('I was pinged');
        //console.log('Request: ', req);
        res.json('Test data coming in!!!');
    });
};