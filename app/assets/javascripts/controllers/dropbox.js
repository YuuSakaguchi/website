class DropboxCtrl {
  constructor($scope, $rootScope, $stateParams) {

    $scope.dropboxLink = $rootScope.getDropboxLink("dropbox_redirect", "code");

    var result = $stateParams.secret_url;
    if(result == "error") {
      $scope.error = result;
    } else {
      $scope.secretUrl = result;
    }

  }
}

angular.module('app.main').controller('DropboxCtrl', DropboxCtrl);
