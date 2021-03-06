Package.describe({
  name: 'nicolaiwadstrom:meteor-angellist',
  version: '0.0.9',
  // Brief, one-line summary of the package.
  summary: 'AngelList API for Meteor',
  git: 'https://github.com/nicolaiwadstrom/meteor-angellist.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server'] );

  api.export('AngelList', ['client', 'server'] );

  api.addFiles( ['angellist_configure.html', 'angellist_configure.js'], 'client');
  api.addFiles('angellist_api.js', ['client', 'server'] );    
  api.addFiles('angellist_server.js', 'server');
  api.addFiles('angellist_client.js', 'client');  
});

/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('nicolaiwadstrom:meteor-angellist');
  api.addFiles('meteor-angellist-tests.js');
});
*/