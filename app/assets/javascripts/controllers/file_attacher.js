class FileAttacherCtrl {
  constructor($scope, $rootScope, $stateParams, $state, Restangular) {

    $scope.getUser = function() {
      var test = $scope.secretUrl.match("file_attacher/(.*)\\?");
      var uuid = test[1];

      var queryString = $scope.secretUrl.substring($scope.secretUrl.indexOf("?"), $scope.secretUrl.length);
      var query = parseQuery(queryString);
      var key = query["key"];

      Restangular.one("users").customGET(uuid, {key: key}).then(function(response){
        sessionStorage.setItem("fa_key", key);
        $scope.user = response.plain();
        $scope.didSetUser();
      })
    }

    $scope.didSetUser = function() {
      $scope.dropboxLink = $rootScope.getDropboxLink("extensions/file_attacher", "token", $scope.user.uuid);
    }

    var location = window.location.href;
    if(location.indexOf("access_token") !== -1) {
      // dropbox auth complete
      var key = sessionStorage.getItem("fa_key");
      var queryString = location.substring(location.indexOf("#"), location.length);
      var query = parseQuery(queryString);
      var dropboxAccessToken = query["access_token"];
      var uuid = query["state"];

      var request = Restangular.one("users", uuid);
      _.merge(request, {dropbox_token : dropboxAccessToken, key : key});
      request.patch().then(function(response){
        window.location.href = `/extensions/file_attacher?secret_url=${$rootScope.baseUrl()}/ext/file_attacher/${uuid}?key=${key}`;
      })

    } else {
      var result = $stateParams.secret_url;
      if(result) {
        if(result == "error") {
          $scope.error = result;
        } else {
          $scope.secretUrl = result;
          $scope.getUser();
        }
      }
    }


    $scope.loginData = {showLogin: false};

    $scope.submitLogin = function() {
      $state.go("extensions.file_attacher", {secret_url: $scope.loginData.secretUrl});
    }

    function parseQuery(qstr) {
        var query = {};
        var a = (qstr[0] === '?' || qstr[0] === '#' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }
  }
}

angular.module('app.main').controller('FileAttacherCtrl', FileAttacherCtrl);
