class ToolsCtrl {
  constructor($rootScope, $scope, $timeout) {

    $scope.importEvernoteFileSelected = function(files) {
      var file = files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        try {
          var sndata = SNTools.convertENEXDatatoSN(data);
          SNTools.downloadSNData(sndata, "evernote-to-sn.txt");
          $timeout(function(){
            $scope.evernoteConversionComplete = true;
          })
        } catch (e) {
          console.log("Error: ", e);
          alert("There was an error processing your file. Please submit your console output to sn@bitar.io.");
        }
      }
      reader.readAsText(file);
    }

  }
}

angular.module('app.main').controller('ToolsCtrl', ToolsCtrl);
