AngelList = AngelList || {};


AngelList = {};

Angellist = AngelList;


/**
 * Makes a remote call to angellist
 * 
 */

AngelList.timeout = 30000;

AngelList.baseUrl = 'https://api.angel.co/1/';

AngelList.remoteCall = function(url) {
	console.log( url );
		
	var result = Meteor.http.get( url, {timeout:AngelList.timeout});
	
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


/**
 * Make a remote call and fetch any/all pages if paged request
 * 
 * 
 */
AngelList.remoteCallAllPages = function( url, dataKey ) {
	var data = [];
	var pageIndex = 1;
	var pagesLeft = 1;
	
	
	while( pagesLeft > 0 ) {
		var currentResponse = AngelList.remoteCall( url + '&page=' + pageIndex );
		
		if ( currentResponse != null ) {			
			data = data.concat( currentResponse[ dataKey ] );
			
			
			if ( currentResponse.page != null && currentResponse.last_page != null )
				pagesLeft = currentResponse.last_page - currentResponse.page;
		}
		
		pageIndex++;
	}
	
	var result = {};
	result[ dataKey ] = data;
	
	return( result );
};


AngelList.getUserProfile = function(token, id) {
	var url = AngelList.baseUrl + id + '?access_token=' + token;
	
	return( AngelList.remoteCall( url ) );	
};


AngelList.getUserRoles = function(token, id) {
	var url = AngelList.baseUrl + 'users/' + id + '/roles?access_token=' + token;
	
	return( AngelList.remoteCallAllPages( url, 'startup_roles' ) );	
};


AngelList.getStartupProfile = function(token, id) {
	var url = AngelList.baseUrl + 'startups/' + id + '?access_token=' + token;
	
	return( AngelList.remoteCall( url ) );	
};


AngelList.getTag = function(token, id) {
	var url = AngelList.baseUrl + 'tags/' + id + '?access_token=' + token;
	
	return( AngelList.remoteCall( url ) );	
};



AngelList.getTagParents = function(token, id) {
	var url = AngelList.baseUrl + 'tags/' + id + '/parents?access_token=' + token;
	
	return( AngelList.remoteCallAllPages( url, 'parents' ) );	
};


AngelList.getTagChildren = function(token, id) {
	var url = AngelList.baseUrl + 'tags/' + id + '/children?access_token=' + token;
	
	return( AngelList.remoteCallAllPages( url, 'parents' ) );	
};
