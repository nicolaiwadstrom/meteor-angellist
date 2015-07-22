AngelList = AngelList || {};

AngelList.whitelistedFields = [
	"id", "name", "image", "bio", "angellist_url", "what_ive_built", "what_i_do", "email"
];

OAuth.registerService('angellist', 2, null, function(query) {
	var response = getTokens(query);
	var accessToken = response.accessToken;
	var idToken = response.idToken;
	var identity = AngelList.getUserProfile( accessToken, 'me' );
	identity.id = String(id);
	
	var serviceData = {
	 accessToken: accessToken,
	 idToken: idToken
	 ,//expiresAt: (+new Date) + (1000 * response.expiresIn)
	};
	
	var fields = _.pick(identity, AngelList.whitelistedFields);
	_.extend(serviceData, fields);
	
	// only set the token in serviceData if it's there. this ensures
	// that we don't lose old ones (since we only get this on the first
	// log in attempt)
	if (response.refreshToken)
	 serviceData.refreshToken = response.refreshToken;
	
	return {
	 serviceData: serviceData,
	 options: {profile: {name: identity.name}}
	};
});
	
//returns an object containing:
//- accessToken
//- expiresIn: lifetime of token in seconds
//- refreshToken, if this is the first authorization request
var getTokens = function (query) {
	var config = ServiceConfiguration.configurations.findOne({service: 'angellist'});
	if (!config)
	 throw new ServiceConfiguration.ConfigError();
	
	console.log(OAuth._redirectUri('angellist', config));

	var response;
	try {
	 response = HTTP.post(
	   "https://angel.co/api/oauth/token", {params: {
	     code: query.code,
	     client_id: config.clientId,
	     client_secret: OAuth.openSecret(config.secret),
	     redirect_uri: OAuth._redirectUri('angellist', config),
	     grant_type: 'authorization_code'
	   }});
	} catch (err) {
	 throw _.extend(new Error("Failed to complete OAuth handshake with AngelList. " + err.message),
	                {response: err.response});
	}
	
	if (response.data.error) { // if the http response was a json object with an error attribute
	 throw new Error("Failed to complete OAuth handshake with AngelList. " + response.data.error);
	} else {
	 return {
	   accessToken: response.data.access_token,
	   refreshToken: response.data.refresh_token,
	   //expiresIn: response.data.expires_in,
	   idToken: response.data.id_token
	 };
	}
};

AngelList.retrieveCredential = function(credentialToken, credentialSecret) {
	return OAuth.retrieveCredential(credentialToken, credentialSecret);
};