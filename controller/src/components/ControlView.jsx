import React from 'react';
import Chart from './Chart.jsx';

function ControlView(props) {
  return (
    <React.Fragment>
      <Chart src='http://127.0.0.1:8000/example/'/>
    </React.Fragment>
  )
}

export default ControlView;