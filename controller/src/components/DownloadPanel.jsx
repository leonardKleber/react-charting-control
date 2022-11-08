import React from 'react';
import DownloadButton from './DownloadButton';

// Renders the download panel of the view.
// As props a boolean parameter 'visible' and a string 'svgData' must be entered.
function DownloadPanel(props) {
  console.log(props.fileName);
  if (props.visible === true) {
    return (
      <React.Fragment>
        <div>
          <label>
            Name
            <input type="text" placeholder="this field is a placeholder"/>
          </label>
          <label>
            Filename
            <input id="file_name" type="text"/>
          </label>
          <DownloadButton svgData={props.svgData}/>
        </div>
      </React.Fragment>
    )
  } else return null
}

export default DownloadPanel;