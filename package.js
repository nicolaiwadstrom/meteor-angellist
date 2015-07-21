Package.describe({
  name: 'qimingfang:meteor-angellist',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'AngelList API for Meteor',
  git: 'https://github.com/qimingfang/meteor-angellist'
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

  api.export('AngelList');

  api.addFiles( ['angellist_configure.html', 'angellist_configure.js'], 'client');
  api.addFiles('angellist_api.js', ['client', 'server'] );    
  api.addFiles('angellist_server.js', 'server');
  api.addFiles('angellist_client.js', 'client');  
});