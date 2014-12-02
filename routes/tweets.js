var twitter = require('ntwitter');
var twit = new twitter({
  consumer_key: 'E7hS667fH8p7A2iOMnANToszd',
  consumer_secret:'0OZHwdXl0IDUJrif8QuxnRufXvMDdaUm8WpqOzqW40bRSFboT1',
  access_token_key: '2845381172-Tx30UQMgoZPl2lyGYA8h9MsL8h6JUWoRiD7JZBC',
  access_token_secret: 'vhHy9MHNSHSjiFeOKKFHPtuTwpQVkrTjzldH0UC0O6pbR',
});

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
});

tweets=[];
exports.stream = function(req, res){
	twit.stream('statuses/sample', function(stream){
		stream.on('data', function(data){
			// console.log(data);
			tweets.push(data);
		});
	setTimeout(function(){
		res.render('stream', {title: 'Twitter Stream', tweets: tweets});
		stream.destroy();
		console.log("Done");
	}, 3000)

	});
}

exports.search = function(req, res){

	client.ping({
	  requestTimeout: 1000,
	  hello: "elasticsearch!"
	}, function (error) {
		if(error) {
		console.error('elasticsearch cluster is down!');
	} else {
		console.log('All is well');
	}
	});
}