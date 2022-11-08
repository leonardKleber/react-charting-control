import React from 'react';

// Renders the settings panel of the view.
// As props a boolean parameter 'visible' must be entered.
function SettingsPanel(props) {
  const presets = ['test', 'line', 'scatter'];

  if (props.visible === true) {
    return (
      <React.Fragment>
        <div>
          <label>
            Preset
            <select>
              {presets.map((preset) => (
                <option value={preset}>{preset}</option>
              ))}
            </select>
          </label>
          <label>
            Width
            <input type="text"/>
          </label>
          <label>
            Height
            <input type="text"/>
          </label>
        </div>
      </React.Fragment>
    )
  } else return null
}

export default SettingsPanel;