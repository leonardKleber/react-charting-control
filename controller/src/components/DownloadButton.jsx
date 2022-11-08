import React from 'react';

// Downloads image from API.
function download(data) {
  // Gets file name from file_name input field.
  var file_name = document.getElementById('file_name');
  var filename = ''
  if (file_name) {
    filename = file_name.value + '.svg';
  } else {
    filename = 'default.svg';
  }
  // Downlaods the file.
  var file = new Blob([data], {type: 'text/plain'});
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}

// Renders a download button for the download panel.
// As props a string 'svgData' must be entered.
function DownloadButton(props) {
  return (
    <React.Fragment>
      <button onClick={() => download(props.svgData)}>
        Download
      </button>
    </React.Fragment>
  )
}

export default DownloadButton;