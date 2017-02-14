class BaseCtrl {
  constructor($rootScope) {

    console.log("ext server", window._ext_server);

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

    $rootScope.producers = [
      {name: "Jeff Camealy", link: "https://recordsetter.com/world-record/consecutive-bounces-table-tennis-ball-alternating-between-base-inside-coffee-mug/50623"},
      {name: "Carl Fletcher", link: ""},
      {name: "Lev Lazinskiy", link: "https://twitter.com/levlaz"},
      {name: "Phil Weber", link: "https://twitter.com/philweber"},
      {name: "Jorge Bay", link: "https://twitter.com/jorgebg"},
      {name: "Jason Kim", link: "https://twitter.com/jasoki"},
    ]
  }
}

angular.module('app.main').controller('BaseCtrl', BaseCtrl);
