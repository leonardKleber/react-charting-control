import React, { useState } from 'react';
import SettingsPanel from './SettingsPanel';
import DownloadPanel from './DownloadPanel';
import axios from 'axios';

const baseURL = 'http://localhost:8000/chart/';

// Renders the complete control view.
// As props a boolean parameter 'showDownloadPanel' must be entered.
function Control(props) {
  const [svgData, setSvgData] = useState('');

  // Gets parameters of control view to create a post request to the API.
  function render_chart() {
    var test_parameters = {
      //name: 'test',
      preset: 'test',
      file_name: 'test.svg',
      width: 1000,
      height: 1000
    };
  
    axios.post(baseURL, test_parameters).then((response) => {
      setSvgData(response.data);
    })
  }

  console.log(svgData);

  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{__html: svgData}}/>
      <SettingsPanel visible={true}/>
      <DownloadPanel 
        visible={props.showDownloadPanel}
        svgData={svgData}
      />
      <button onClick={render_chart}>Render</button>
    </React.Fragment>
  )
}

export default Control;