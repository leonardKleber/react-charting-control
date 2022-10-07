import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./chart.css";

function Chart(props) {
  const [zoom, setZoom] = useState(1);

  var chart = document.getElementById('chart');
  if(chart) {
    chart.style.transform = 'scale(' + String(zoom) + ')';
  }
  
  return (
    <React.Fragment>
      <div id="buttons">
        <button class="zoom" onClick={() => setZoom(zoom + 0.2)}>+</button>
        <button class="zoom" onClick={() => setZoom(zoom - 0.2)}>-</button>
        <button class="reset" onClick={() => setZoom(1)}>Reset</button>
      </div>
      <div id="chart_canvas">
        <img id="chart" src={props.url}/>
      </div>
    </React.Fragment>
  )
}

export default Chart;