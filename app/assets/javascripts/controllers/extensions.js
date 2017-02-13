class ExtensionsCtrl {
  constructor($scope) {

    $scope.freeExtensions = [
      {
        name: "Dropbox Sync",
        desc: "The Dropbox Sync extension allows you to sync your tags and notes to Dropbox for added redundancy.",
        sref: "extensions.dropbox"
      },
      {
        name: "File Attachments",
        desc: "An extension that allows you to attach files to your notes.",
        sref: "extensions.file_attacher"
      },
      {
        name: "Standard Journal",
        desc: "A blogging extension for standard notes. Easily create your own personal blog from your notes.",
        href: "https://github.com/standardnotes/standard-journal"
      }
    ]

    $scope.proExtensions = [
      {
        name: "Note History",
        desc: "Track changes to your notes and restore to older versions.",
        sref: "extensions.history"
      }
    ]

  }
}

angular.module('app.main').controller('ExtensionsCtrl', ExtensionsCtrl);
