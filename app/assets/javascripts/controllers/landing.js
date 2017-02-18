class LandingCtrl {
  constructor($rootScope, $scope, $timeout) {

    $scope.displayData = {};
    let currentDesktopVersion = "0.2.4";

    document.onkeydown = function(e) {
      $timeout(function(){
        if (e.keyCode == '37') {
          $scope.previousScreenshot();
        } else if(e.keyCode == '39') {
          $scope.nextScreenshot();
        } else if(e.keyCode == '27') {
          $scope.displayData.screenshot = null;
        }
      })
    }

    $scope.downloads = [
      {
        name: "Web",
        icon: "ico-chrome.png",
        link: "https://app.standardnotes.org",
        screenshots: [
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/1.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/2.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/3.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/4.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/5.jpg"
        ]
      },
      {
        name: "iOS",
        icon: "ico-apple.png",
        link: "https://itunes.apple.com/us/app/id1191215138?mt=8",
        screenshots: [
          "https://s3.amazonaws.com/standard-notes/screenshots/ios/1.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/ios/2.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/ios/3.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/ios/4.jpg",
        ]
      },
      {
        name: "Mac",
        icon: "ico-apple.png",
        link: "https://github.com/standardnotes/desktop/releases/download/v0.2.4/standard-notes-0.2.4-mac.zip",
        screenshots: [
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/1.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/2.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/3.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/4.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/5.jpg"
        ]
      },
      {
        name: "Windows",
        icon: "ico-windows.png",
        link: "https://github.com/standardnotes/desktop/releases/download/v0.2.4/standard-notes-Setup-0.2.4.exe",
        screenshots: [
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/1.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/2.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/3.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/4.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/5.jpg"
        ]
      },
      {
        name: "Linux",
        icon: "ico-linux.png",
        link: "https://github.com/standardnotes/desktop/releases/download/v0.2.4/standard-notes-0.2.4-x86_64.AppImage",
        screenshots: [
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/1.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/2.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/3.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/4.jpg",
          "https://s3.amazonaws.com/standard-notes/screenshots/web/jpg/5.jpg"
        ]
      },
      {
        name: "Android (In Development)",
        icon: "ico-android.png",
        link: "https://github.com/standardnotes/android"
      },
    ];

    $scope.clickedScreenshots = function(item) {
      $scope.screenshots = item.screenshots;
      $scope.screenshotIndex = 0;
      $scope.updateScreenshot();

      // preload images
      var index = 0;
      function loadNext() {
        if(index >= $scope.screenshots.length) {
          return;
        }

        var preloaded = new Image();
        preloaded.src = $scope.screenshots[index];
        index++;

        preloaded.onload = function() {
          console.log("preloaded");
          loadNext();
        };
      }
      loadNext();
    }

    $scope.updateScreenshot = function() {
      $scope.displayData.screenshot = $scope.screenshots[$scope.screenshotIndex];
    }

    $scope.hasNextScreenshot = function() {
      return $scope.screenshotIndex < $scope.screenshots.length - 1;
    }

    $scope.hasPreviousScreenshot = function() {
      return $scope.screenshotIndex > 0;
    }

    $scope.nextScreenshot = function($event) {
      if(!$scope.hasNextScreenshot()) {
        return;
      }

      if($event) {
        $event.stopPropagation();
      }
      $scope.screenshotIndex++;
      $scope.updateScreenshot();
    }

    $scope.previousScreenshot = function($event) {
      if(!$scope.hasPreviousScreenshot()) {
        return;
      }

      if($event) {
        $event.stopPropagation();
      }
      $scope.screenshotIndex--;
      $scope.updateScreenshot();
    }

  }
}

angular.module('app.main').controller('LandingCtrl', LandingCtrl);
