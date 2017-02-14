class ProDashboardCtrl {
  constructor($rootScope, $scope, $timeout, Restangular, $stateParams, $state) {

    $scope.buildExtensions = function() {
      $scope.extensions = [
          {
            name: "Note History",
            desc: "Track changes to your notes and restore to previous versions.",
            url: $scope.user.extension_server_url + "/revisions"
          }
      ]
    }

    if($stateParams.jwt) {
      Restangular.one("pro_users.json", $stateParams.id).get({jwt: $stateParams.jwt})
      .then(function(response){
        $scope.user = response.plain();
        $scope.user.jwt = $stateParams.jwt;
        $scope.buildExtensions();
      })
      .catch(function(errorResponse){
        console.log("Fetch user from JWT error:", errorResponse);
        alert("Your login session has expired.");
        $state.go("pro");
      })
    } else if($stateParams.user) {
      $scope.user = $stateParams.user;
      $scope.buildExtensions();
    }

    $scope.infoFormData = {};
    $scope.submitInfoForm = function() {
      $scope.infoFormData.success = false;
      $scope.infoFormData.error = false;

      var request = Restangular.one("pro_users", $scope.user.id);
      request.jwt = $scope.user.jwt;
      _.merge(request, $scope.user);
      request.patch().then(function(response){
        $scope.infoFormData.success = true;
      })
      .catch(function(errorResponse){
        console.log("Error updating info:", errorResponse);
        $scope.infoFormData.error = true;
      })
    }


  }
}

angular.module('app.main').controller('ProDashboardCtrl', ProDashboardCtrl);