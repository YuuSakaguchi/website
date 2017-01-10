class ToolsCtrl {
  constructor($rootScope, $scope, $timeout) {

    $scope.importEvernoteFileSelected = function(files) {
      var file = files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var sndata = SNTools.convertENEXDatatoSN(data);
        SNTools.downloadSNData(sndata, "evernote-to-sn.txt");
        $timeout(function(){
          $scope.evernoteConversionComplete = true;
        })
      }
      reader.readAsText(file);
    }

  }
}

angular.module('app.main').controller('ToolsCtrl', ToolsCtrl);
