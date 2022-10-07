import React from 'react';
import Chart from './Chart.jsx';

const baseURL = 'http://127.0.0.1:8000/example/';

function ControlView(props) {
  return (
    <React.Fragment>
      <Chart url={baseURL}/>
    </React.Fragment>
  )
}

export default ControlView;