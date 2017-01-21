class BaseCtrl {
  constructor($rootScope) {

    $rootScope.baseUrl = function() {
      return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    }

    $rootScope.getDropboxLink = function(redirect, type, state) {
      var clientId = "7wzjlm5ap227jw7";
      var host = $rootScope.baseUrl();
      var absoluteRedirect = host + "/" + redirect;
      var url = "https://www.dropbox.com/1/oauth2/authorize?client_id=" + clientId + "&response_type=" + type + "&redirect_uri=" + absoluteRedirect;
      if(state) {
        url += "&state=" + state;
      }
      return url;
    }
  }
}

angular.module('app.main').controller('BaseCtrl', BaseCtrl);
