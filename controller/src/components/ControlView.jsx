import React, { useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8000/example/';

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

function ControlView(props) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setSvg(response.data);
    });
  }, []);

  if (!svg) setSvg('Chart could not be loaded.');

  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{__html: svg}}/>
      <button onClick={() => download(svg, 'chart.svg')}>Download</button>
    </React.Fragment>
  )
}

export default ControlView;