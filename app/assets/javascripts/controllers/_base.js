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

    $rootScope.producers = [
      {name: "Jeff Camealy", link: "https://recordsetter.com/world-record/consecutive-bounces-table-tennis-ball-alternating-between-base-inside-coffee-mug/50623"},
      {name: "Carl Fletcher", link: "http://www.carlfletcher.org/"},
      {name: "Jay Zisch", link: "https://github.com/jz709u"},
      {name: "Lev Lazinskiy", link: "https://twitter.com/levlaz"},
      {name: "Noel Bautista", link: "http://codingdoodles.com/"},
      {name: "Amit Shinde", link: "https://github.com/amtsh"},
      {name: "Sergio Pantoja", link: "https://github.com/sergiopantoja"},
      {name: "John Huang", link: "https://twitter.com/ymhuang0808"},
      {name: "Jamie Tanna", link: "https://twitter.com/jamietanna"},
      {name: "Phil Weber", link: "https://twitter.com/philweber"},
      {name: "Jorge Bay", link: "https://twitter.com/jorgebg"},
      {name: "Jason Kim", link: "https://twitter.com/jasoki"},
    ]
  }
}

angular.module('app.main').controller('BaseCtrl', BaseCtrl);
