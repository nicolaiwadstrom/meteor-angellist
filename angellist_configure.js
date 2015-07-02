Template.configureLoginServiceDialogForAngelList.helpers({
  siteUrl: function () {
  // Twitter doesn't recognize localhost as a domain name
    return Meteor.absoluteUrl({replaceLocalhost: true});
  }
});

Template.configureLoginServiceDialogForAngelList.fields = function () {
  return [
          {property: 'clientId', label: 'Client ID'},
          {property: 'secret', label: 'Client secret'}
  ];
};
