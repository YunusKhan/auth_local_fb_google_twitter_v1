

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1781267038826191', // your App ID
		'clientSecret' 	: '4d5db916bfe9f16b9d45b066c35f5f8c', // your App Secret
		'callbackURL' 	: 'http://localhost:3015/facebook_login/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'DQxLd0Ab84t6dwIClLGXAiAU3',
		'consumerSecret' 	: 'DxRDNBTrZMBdQB8j2cR2rJu71MidxhAuPBUq9wMUlrEipLzOca',
		'callbackURL' 		: 'http://127.0.0.1:3015/twitter_login/callback'
	},

	'googleAuth' : {
		'clientID' 		: '578569860842-g9ince0thqv0ka5tgojquc4898jps2mu.apps.googleusercontent.com',
		'clientSecret' 	: 'yJPoE7E0jNm3HKo7CSHiaVvG',
		'callbackURL' 	: 'http://localhost:3015/google_login/callback'
	}

};

