class ProCtrl {
  constructor($rootScope, $scope, $timeout, Restangular, $state) {

    $scope.formData = {};

    $scope.submitEmail = function() {
      var request = Restangular.one("pro_users");
      request.email = $scope.formData.email;
      request.post().then(function(response){
        var status = response.status;
        if(status == "login-email-sent") {
          $scope.formData.registrationResponse = "A login link has been sent to your email address. Please follow that link to continue.";
        } else if(status == "did-register" || status == "expired") {
          $scope.user = response.user;
          $scope.user.jwt = response.token;
          $scope.purchaseSubscription();
        }
      })
      .catch(function(errorResponse){
        console.log("Submit error: ", errorResponse);
        alert("There was an error processing your request. Please try again.");
      })
    }

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

    $scope.purchaseSubscription = function() {
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
          name: 'Standard Notes Pro',
          description: 'Subscription',
          amount: 3000
        });
      })
    }

    $scope.submitSubscriptionRequest = function(stripeToken) {
      $scope.formData.processing = true;

      var request = Restangular.one("subscriptions");
      request.jwt = $scope.user.jwt;

      if(stripeToken) {
       request.token = stripeToken.id;
       request.email = stripeToken.email;
       request.token_type = stripeToken.type;
      }

      request.post()
      .then(function(response){
        $scope.formData.processing = false;
        if(!response.error) {
          $scope.formData.success = true;
          $timeout(function(){
            $state.go("pro_dashboard", {user: $scope.user})
          }, 1250)
        } else {
          console.log("Subscription error:", response.data);
          $scope.formData.error = response.error;
        }
      })
      .catch(function(response) {
        $scope.formData.processing = false;
        $scope.formData.error = {message: "There was an error processing your subscription. Please try again. If you continue to see problems, please email hello@standardnotes.org."}
      })
    }
  }
}

angular.module('app.main').controller('ProCtrl', ProCtrl);
