var express = require('express'),
   app = express(),
   request = require('request'),
   port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

//app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//});
app.get('/api/:id', function(req, res) {
   var url='http://itunes.apple.com/lookup?', id=req.params.id, q, promise;
   
   // If all numbers, it's an APP ID. else its a BUNDLE ID
   if(/^\d+$/.test(id)) q = 'id=' + id;
   else q = 'bundleId=' + id;

   url += q;
   console.log('Getting url', url);

   request
      .get(url, function(err, resp, body){
         if(err) return res.status(500).json(err);
         res.json(JSON.parse(body));
      })
      .on('response', function(resp) {
         res.status(resp.statusCode);
      });
});
app.use(express.static('static'));

app.listen(port);
console.log('Listening on port ' + port);
