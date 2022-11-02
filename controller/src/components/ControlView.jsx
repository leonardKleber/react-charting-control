import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DownloadButton from './DownloadButton';

const baseURL = 'http://localhost:8000/example/';

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
      <DownloadButton data={svg}/>
    </React.Fragment>
  )
}

export default ControlView;