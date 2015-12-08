
function storeTweets(tweet,mycollection){
    /* MongoDB */
	var dburl = 'localhost/database';
	var mycol = mycollection; // o pinakas pou theloume na apothikeusoume
	var collections = [mycol];
	var db = require('mongojs').connect(dburl, collections);
	db.collection(mycollection).ensureIndex({ text: 1 }, { unique: true });

    /*Create object in order to pass it to mongodb*/

	console.log(tweet.$keywords[0].magenta);
	if (tweet.location != null)
		console.log('location:',tweet.location.magenta);

	//console.log(tweet);
	var twt = {
		created_at: tweet.created_at,
	  id: tweet.id,
	  text: tweet.text,
	  source: tweet.source,

	  user:
	   { id: tweet.user.id,
	     id_str: tweet.user.id_str,
	     name: tweet.user.name,
	     screen_name: tweet.user.screen_name,
	     location: tweet.user.location,
	     url: tweet.user.url,
	     followers_count: tweet.user.followers_count,
	     friends_count: tweet.user.friends_count,
	     statuses_count: tweet.user.statuses_count,
	     created_at: tweet.user.created_at,
	    },
	  geo: tweet.geo,
	  coordinates: tweet.coordinates,
	  place: tweet.place,

	  retweet_count: tweet.retweet_count,
	  favorite_count: tweet.favorite_count,
	  favorited: tweet.favorited,
	  retweeted: tweet.retweeted,
	  lang: tweet.lang,
	  timestamp_ms: tweet.timestamp_ms,
	  hashtags : [tweet.$keywords[0]],
		//channels : [tweet.$channels[0]]

		}

	    db.collection(mycol).save(twt, function (err, savedTweet) {
			if (err || !savedTweet) console.log("error");
			else console.log("saved");
	        db.close();
			});
	
}

var colors = require('colors');

var TwitterStreamChannels = require('twitter-stream-channels');
var credentials = {
	"consumer_key": 'iqGGQ8NyBdD2MVVrVO1mCMS1U',
   	"consumer_secret": 'CCElPTV41UhmlDYFH1ZJZoFnqYUKtKHg37zOL62CaSwOsVduof',
   	"access_token": '3307210678-31tieWYvkFDuRRlASpjr9p7MtIi7dl1ekyzQtG8',
   	"access_token_secret": 'wSvva6wV2Cyd2PhUmle6h81RZRsrA9FUolHcsQNZyFaXU'
    };
var client = new TwitterStreamChannels(credentials);

/*Symplhrwsh sxetikwn/omoiwn hashtags se morfh pinaka */
var hashtags = {
  "General" : ['#nea_demokratia','#neadimokratia','#NDekloges22','#ΝΔ','#eklogesnd','#enas_apo_emas',' #karamanlis_gate'],
	"Tzitzikostas" : ['#tzitzikostas','#Τζιτζικώστας','#tolmame'],
	"Meimar" : ['#Meimarakis','#eimai_me_ton_v'],
	"Mitso" : ['#metonkyriako','#kmitsotakis','#metonKyriako','#mitsotakis'],
	"Adonis" : ['#adonisforpresident','#Adonis','#JesuisAdonis','#Άδωνις']
};



var stream = client.streamChannels({track:hashtags});

stream.on('channels/General',function(tweet){
	console.log('>General',tweet.text.blue);
  storeTweets(tweet,"nd");
});
stream.on('channels/Tzitzikostas',function(tweet){
	console.log('>Tzitzi',tweet.text.grey);
  storeTweets(tweet,"Tzitzi");
});
stream.on('channels/Mitso',function(tweet){
	console.log('>Mitso',tweet.text.grey);
  storeTweets(tweet,"Mitso");
});
stream.on('channels/Adonis',function(tweet){
	console.log('>Adonis',tweet.text.grey);
  storeTweets(tweet,"Adonis");
});
stream.on('channels/Meimar',function(tweet){
	console.log('>Meimar',tweet.text.grey);
  storeTweets(tweet,"Meimar");
});
