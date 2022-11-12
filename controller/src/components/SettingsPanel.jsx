import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const presetURL = 'http://localhost:8000/presets/';

// Renders the settings panel of the view.
// As props a boolean parameter 'visible' must be entered.
function SettingsPanel(props) {
  const [presets, setPresets] = useState([]);

  // Gets all available presets from API.
  useEffect(() => {
    axios.get(presetURL).then((response) => {
      setPresets(response.data);
    });
  }, []);

  if (props.visible === true) {
    return (
      <React.Fragment>
        <div id="settings_panel">
          <label id="preset_label">
            Preset
            <select id='chart_preset'>
              {presets.map((preset) => (
                <option value={preset}>{preset}</option>
              ))}
            </select>
          </label>
          <label id="width_label">
            Width
            <input id="chart_width" type="text"/>
          </label>
          <label id="height_label">
            Height
            <input id="chart_height" type="text"/>
          </label>
        </div>
      </React.Fragment>
    )
  } else return null
}

export default SettingsPanel;