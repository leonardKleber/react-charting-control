import React, { useState } from 'react';
import SettingsPanel from './SettingsPanel';
import DownloadPanel from './DownloadPanel';
import axios from 'axios';
import './style.css';

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
    } else width = window.innerWidth * 0.75
    
    var height = '';
    var height_element = document.getElementById('chart_height').value;
    if (height_element !== '') {
      height = height_element;
    } else height = window.innerHeight * 0.75

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
      <div id="chart_div">
        <div id="chart" dangerouslySetInnerHTML={{__html: svgData}}/>
      </div>
      <SettingsPanel visible={true}/>
      <DownloadPanel 
        visible={props.showDownloadPanel}
        svgData={svgData}
      />
      <button id="render_button" onClick={render_chart}>Render</button>
    </React.Fragment>
  )
}

export default Control;