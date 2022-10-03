import React, { useState } from 'react';
import "./chart.css";

function Chart(props) {
  const [zoom, setZoom] = useState(1);

  var chart = document.getElementById('chart');
  if(chart) {
    chart.style.transform = 'scale(' + String(zoom) + ')';
  }

  return (
    <React.Fragment>
      <div id="chart_border">
        <div id="chart">
            <img src={props.src}/>
        </div>
      </div>
      <button onClick={() => setZoom(zoom + 0.2)}>Zoom In</button>
      <button onClick={() => setZoom(zoom - 0.2)}>Zoom Out</button>
    </React.Fragment>
  )
}

export default Chart;