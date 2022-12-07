import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Control() {
  return(
    <TransformWrapper
      initialScale={1}
      centerOnInit={true}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div>
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>Reset</button>
          </div>
          <TransformComponent
            wrapperStyle={{
              width: '50%',
              height: '50%',
              backgroundColor: 'grey'
            }}
          >
            <img src="http://localhost:8000/test/" alt="test"/>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  )
}

export default Control;