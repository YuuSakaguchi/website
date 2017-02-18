class ExtensionsCtrl {
  constructor($scope) {

    $scope.extServer = window._ext_server;

    $scope.freeExtensions = [
      {
        name: "Dropbox Sync",
        desc: "The Dropbox Sync extension allows you to sync your tags and notes to Dropbox for added redundancy.",
        href: window._ext_server + "/dropbox"
      },
      {
        name: "File Attachments",
        desc: "An extension that allows you to attach files to your notes.",
        sref: "extensions.file_attacher"
      },
      {
        name: "Simple Markdown Editor",
        desc: "A simple Markdown editor with split pane preview.",
        sref: "extensions.simple_markdown"
      },
      {
        name: "Standard Journal",
        desc: "A blogging extension for Standard Notes. Easily create your own personal blog from your notes.",
        href: "https://github.com/standardnotes/standard-journal"
      }
    ]

    $scope.proExtensions = [
      {
        name: "Note History",
        desc: "Track changes to your notes and restore to previous versions.",
        sref: "extensions.history"
      },
      {
        name: "Advanced Markdown Editor",
        desc: "An advanced Markdown editor with live preview, editor toolbar, and split pane support.",
        sref: "extensions.advanced_markdown"
      }
    ]

  }
}

angular.module('app.main').controller('ExtensionsCtrl', ExtensionsCtrl);
