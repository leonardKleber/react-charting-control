import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const BASE_URL = 'http://localhost:8000/chart/';
const PRESET_URL = 'http://localhost:8000/presets/';

// DESCRIPTION:
// This component handles the structure of the view. It displays the chart
// with zoom in, zoom out and a reset button. It also includes a render button
// which, when pressed, sends a post request to the API to retrieve the chart SVG.
function Control() {
  // Stores the SVG data that will be retrieved from the API.
  const [svgData, setSvgData] = useState('');

  // Holds a list with all supported presets.
  const [presets, setPresets] = useState([]);
  useEffect(() => {
    axios.get(PRESET_URL).then((response) => {
      setPresets(response.data);
    });
  }, []);
  
  // Stores the preset that was selected in the selector field.
  const [preset, setPreset] = useState('');
  const handlePresetField = (event) => {
    setPreset(event.target.value);
  };

  // Sends a post request to the API.
  function render_chart() {
    // Get height and width parameters.
    var width = '';
    var height = '';
    var width_element = document.getElementById('input-field-width').value;
    var height_element = document.getElementById('input-field-height').value;
    if (width_element !== '') {
      width = width_element;
    } else width = window.innerWidth * 0.8;
    if (height_element !== '') {
      height = height_element;
    } else height = window.innerHeight * 0.7;

    var parameters = {
      preset: preset,
      width: Number(width),
      height: Number(height)
    };

    axios.post(BASE_URL, parameters).then((response) => {
      setSvgData(response.data);
    });
  }

  // Downloads SVG to users local files.
  function download_svg(data, filename) {
    if(filename) filename = filename + '.svg';
    else filename = 'default.svg';
  
    var file = new Blob([data], {type: 'text/plain'});
    
    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      var a = document.createElement("a");
      var url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
      }, 0); 
    }
  } 

  return(
    <React.Fragment>
      {/* *************************************************************
        This is the structure of the Chart Panel and the Zoom Buttons.
      ************************************************************* */}
      <TransformWrapper initialScale={1} centerOnInit={true}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div style={{
            position: 'absolute',
            right: '10%'
          }}>
            <Stack spacing={1} direction="row">
              <Button onClick={() => zoomIn()} variant="outlined">+</Button>
              <Button onClick={() => zoomOut()} variant="outlined">-</Button>
              <Button onClick={() => resetTransform()} variant="outlined">Reset</Button>
            </Stack>
          </div>
          <TransformComponent
            wrapperStyle={{
              backgroundColor: '#EEEEEE',
              position: 'absolute',
              width: '80%',
              height: '70%',
              left: '10%',
              top: '5%'
            }}
          >
            <div id="chart" dangerouslySetInnerHTML={{__html: svgData}}/>
          </TransformComponent>
        </React.Fragment>
      )}
      </TransformWrapper>
      {/* *************************************************************
        This is the structure of the Settings Panel.
      ************************************************************* */}
      <div style={{
        position: 'absolute',
        top: '76%',
        left: '10%',
        width: '80%'
      }}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={1}>
            <Grid item xs>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Preset</InputLabel>
                  <Select
                    labelId="select"
                    value={preset}
                    label="Preset"
                    onChange={handlePresetField}
                  >
                    {presets.map((preset) => (
                      <MenuItem value={preset}>{preset}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <TextField id='input-field-width' label='Width' variant='outlined'/>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <TextField id='input-field-height' label='Height' variant='outlined'/>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* *************************************************************
        This is the structure of the Download Panel.
      ************************************************************* */}
      <div style={{
        position: 'absolute',
        top: '84%',
        left: '10%',
        width: '80%',
      }}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={1}>
            <Grid item xs>
              <FormControl fullWidth>
                <TextField id="input-field-filename" label='Filename' variant='outlined'/>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Button 
                  variant="outlined"
                  onClick={() => download_svg(
                    svgData,
                    document.getElementById('input-field-filename').value
                  )}
                >
                  Download
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* *************************************************************
        This is the structure of the Render Button.
      ************************************************************* */}
      <div style={{
        position: 'absolute',
        top: '92%',
        left: '10%',
        width: '80%'
      }}>
        <Box sx={{flexGrow: 1}}>
          <FormControl fullWidth>
            <Button onClick={() => render_chart()} variant="contained">Render</Button>
          </FormControl>
        </Box>
      </div>
    </React.Fragment>
  )
}

export default Control;