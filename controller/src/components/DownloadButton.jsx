import React from 'react';

function download(data, filename) {
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

function DownloadButton(props) {
  return (
    <React.Fragment>
      <button onClick={() => download(props.data, 'chart.svg')}>
        Download
      </button>
    </React.Fragment>
  )
}

export default DownloadButton;