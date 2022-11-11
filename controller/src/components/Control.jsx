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
    var width_element = document.getElementById('chart_width').value;
    if (width_element !== '') {
      width = width_element;
    } else width = '500'
    
    var height = '';
    var height_element = document.getElementById('chart_height').value;
    if (height_element !== '') {
      height = height_element;
    } else height = '500'

    var preset = '';
    var preset_element = document.getElementById('chart_preset').value;
    if (preset_element !== '') {
      preset = preset_element;
    } else preset = 'line'

    var parameters = {
      preset: preset,
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