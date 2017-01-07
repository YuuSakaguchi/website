class DropboxCtrl {
  constructor($scope, $stateParams) {
    var clientId = "7wzjlm5ap227jw7";
    var redirect = "http://localhost:3002/dropbox_redirect";
    $scope.dropboxLink = "https://www.dropbox.com/1/oauth2/authorize?client_id=" + clientId + "&response_type=code&redirect_uri=" + redirect;

    var result = $stateParams.secret_url;
    if(result == "error") {
      $scope.error = result;
    } else {
      $scope.secretUrl = result;
    }
    console.log("secret url", $stateParams);
  }
}

angular.module('app.main').controller('DropboxCtrl', DropboxCtrl);
