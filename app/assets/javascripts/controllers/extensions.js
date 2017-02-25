class ExtensionsCtrl {
  constructor($scope) {

    $scope.freeExtensions = [
      {
        name: "Dropbox Sync",
        desc: "Allows you to sync your tags and notes to Dropbox for added redundancy.",
        href: window._ext_server + "/dropbox",
        types: ["Standard File Extension"]
      },
      {
        name: "File Attachments",
        desc: "An extension that allows you to attach files to your notes.",
        sref: "extensions.file_attacher",
        types: ["Standard Notes Extension"]
      },
      {
        name: "Simple Markdown Editor",
        desc: "A simple Markdown editor with split pane preview.",
        sref: "extensions.simple_markdown",
        types: ["Standard Notes Extension"]
      },
      {
        name: "Standard Journal",
        desc: "A blogging extension for Standard Notes. Easily create your own personal blog from your notes.",
        href: "https://github.com/standardnotes/standard-journal",
        types: ["Standard Notes Extension"]
      }
    ]

    $scope.proExtensions = [
      {
        name: "Note History",
        desc: "Track changes to your notes and restore to previous versions.",
        sref: "extensions.history",
        types: ["Standard Notes Extension", "Standard File Extension"]

      },
      {
        name: "Advanced Markdown Editor",
        desc: "An advanced Markdown editor with live preview, editor toolbar, and split pane support.",
        sref: "extensions.advanced_markdown",
        types: ["Standard Notes Extension"]
      },
      {
        name: "Code Editor",
        desc: "A powerful code editor with support for over 120 programming languages.",
        sref: "extensions.code_editor",
        types: ["Standard Notes Extension"]
      }
    ]

    $scope.experimentalExtensions = [
      {
        name: "Realtime Collaborative Editor",
        desc: "A proof of concept collaborative text editor with end-to-end encryption.",
        sref: "extensions.collab",
        types: ["Standard Notes Extension"]
      }
    ]

  }
}

angular.module('app.main').controller('ExtensionsCtrl', ExtensionsCtrl);
