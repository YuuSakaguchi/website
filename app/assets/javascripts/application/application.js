document.addEventListener("DOMContentLoaded", function(event) {
  var dropContainer = document.getElementById("drop-container");
  var fileInput = document.getElementById("file-input");

  if(fileInput) {
    fileInput.onchange = function() {
      document.getElementById("file-attacher-form").submit();
    };

    var onEnter = function() {
      dropContainer.classList.add('is-dragover');
    }

    var onExit = function() {
      dropContainer.classList.remove('is-dragover');
    }

    dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
      onEnter();
      evt.preventDefault();
    };

    dropContainer.ondragleave = dropContainer.ondragend = onExit;

    dropContainer.ondrop = function(evt) {
      onExit();
      dropContainer.classList.add('is-uploading');
      fileInput.files = evt.dataTransfer.files;
      evt.preventDefault();
    };
  }

});
