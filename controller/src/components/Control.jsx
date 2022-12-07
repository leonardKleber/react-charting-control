import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const baseURL = 'http://localhost:8000/chart/';

// DESCRIPTION:
// This component handles the structure of the view. It displays the chart
// with zoom in, zoom out and a reset button. It also includes a render button
// which, when pressed, sends a post request to the API to retrieve the chart SVG.
function Control() {
  // Stores the SVG data that will be retrieved from the API.
  const [svgData, setSvgData] = useState('');

  // Sends a post request to the API.
  function render_chart() {
    var parameters = {
      preset: 'm_line_chart',
      width: 500,
      height: 500
    };
    axios.post(baseURL, parameters).then((response) => {
      setSvgData(response.data);
    });
  }

  return(
    <React.Fragment>
      <TransformWrapper initialScale={1} centerOnInit={true}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div>
              <button 
                onClick={() => zoomIn()}
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '75%',
                  width: '4%',
                  height: '4%'
                }}
              >
                +
              </button>
              <button 
                onClick={() => zoomOut()}
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '80%',
                  width: '4%',
                  height: '4%'
                }}
              >
                -
              </button>
              <button 
                onClick={() => resetTransform()}
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '85%',
                  width: '4%',
                  height: '4%'
                }}
              >
                Reset
              </button>
            </div>
            <TransformComponent
              wrapperStyle={{
                position: 'absolute',
                top: '15%',
                left: '15%',
                width: '70%',
                height: '70%',
                //outlineColor: 'black',
                //outlineWidth: '3px',
                //outlineStyle: 'solid'
              }}
            >
              <div id="chart" dangerouslySetInnerHTML={{__html: svgData}}/>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      <div>
        <button 
          onClick={render_chart}
          style={{
            position: 'absolute',
            top: '90%',
            left: '15%',
            width: '70%',
            height: '4%'
          }}
        >
          Render
        </button>
      </div>
    </React.Fragment>
  )
}

export default Control;