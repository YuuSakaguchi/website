angular.module('app.main')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('base', {
        abstract: true,
      })

      .state('landing', {
        url: '/',
        parent: 'base',
        views: {
          'content@' : {
            templateUrl: 'templates/landing.html',
            controller: 'LandingCtrl'
          }
        }
      })

      .state('extensions', {
        url: '/extensions',
        views: {
          'content@' : {
            templateUrl: 'templates/extensions.html',
            controller: 'ExtensionsCtrl'
          }
        }
      })

      .state('extensions.dropbox', {
        url: '/dropbox?secret_url',

        views: {
          'content@' : {
            templateUrl: 'templates/dropbox.html',
            controller: 'DropboxCtrl'
          }
        }
      })

      .state('tools', {
        url: '/import',
        views: {
          'content@' : {
            templateUrl: 'templates/tools.html',
            controller: 'ToolsCtrl'
          }
        }
      })

      // 404 Error
      .state('404', {
        parent: 'base',
        views: {
          'content@' : {
            templateUrl: 'errors/404.html'
          }
        }
      });

      // Default fall back route
      $urlRouterProvider.otherwise(function($injector, $location){
         var state = $injector.get('$state');
         state.go('404');
         return $location.path();
      });

      // enable HTML5 Mode for SEO
      $locationProvider.html5Mode(true);

  });
