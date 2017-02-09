class ProducersCtrl {
  constructor($rootScope, $scope, $timeout, Restangular) {

    $scope.formData = {};

    function loadStripe(callback) {
      if(window.StripeCheckout) {
        callback();
        return;
      }

      var scriptTag = document.createElement('script');
      scriptTag.src = "https://checkout.stripe.com/checkout.js";
      scriptTag.async = false;
      var headTag = document.getElementsByTagName('head')[0];
      headTag.appendChild(scriptTag);
      scriptTag.onload = function() {
        callback();
      }
    }

    $scope.clickedPurchaseSubscription = function() {
      loadStripe(function(){
        var handler = StripeCheckout.configure({
          key: 'pk_test_tF4XCNKWB67oNdSM4z4WPTaJ',
          locale: 'auto',
          bitcoin: true,
          token: function(token) {
            $scope.submitSubscriptionRequest(token);
          }
        });

        handler.open({
          name: 'Producer Program',
          description: 'Annual Contribution',
          amount: 900
        });
      })
    }

    $scope.submitSubscriptionRequest = function(token) {
      $scope.formData.processing = true;

      var request = Restangular.one("subscriptions");
      request.name = $scope.formData.name;
      request.email = $scope.formData.email;
      request.anon = $scope.formData.anon;
      request.website = $scope.formData.website;

      if(token) {
       request.token = token.id;
       request.email = token.email;
       request.token_type = token.type;
      }

      request.post()
      .then(function(response){
        $scope.formData.processing = false;
        if(!response.error) {
          $scope.formData.success = true;
        } else {
          console.log("Subscription error:", response.data);
          $scope.formData.error = response.error;
        }
      })
      .catch(function(response) {
        $scope.formData.processing = false;
        $scope.formData.error = {message: "There was an error processing your subscription. Please try again. If you continue to see problems, please email standardnotes@bitar.io."}
      })
    }
  }
}

angular.module('app.main').controller('ProducersCtrl', ProducersCtrl);
