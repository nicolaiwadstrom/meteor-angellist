AngelList = AngelList || {};


AngelList.timeout = 30000;


		
AngelList.remoteCall = function(url) {
		
	var result = Meteor.http.get( url, {timeout:Angellist.timeout});
	
	if( result.statusCode==200 ) {
		var respJson = JSON.parse(result.content);
		return( respJson );
	}
	
	else {
		console.log("Response issue: ", result.statusCode);
		var errorJson = JSON.parse(result.content);
		throw new Meteor.Error(result.statusCode, errorJson.error);			
	}		
	
};


AngelList.getUserProfile = function(token, alUserId) {
	var url = 'https://api.angel.co/1/' + alUserId + '?access_token=' + token;
	
	return( AngelList.remoteCall( url ) );	
};

