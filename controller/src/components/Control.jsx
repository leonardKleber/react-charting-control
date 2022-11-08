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
    var width = '';
    if (document.getElementById('chart_width')) {
      width = document.getElementById('chart_width').value;
    } else {
      width = '1000'
    }
    var height = '';
    if (document.getElementById('chart_height')) {
      height = document.getElementById('chart_height').value;
    } else {
      height = '1000'
    }
    var parameters = {
      preset: 'test',
      width: Number(width),
      height: Number(height)
    };
  
    axios.post(baseURL, parameters).then((response) => {
      setSvgData(response.data);
    });
  }

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