from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from engines.svg_engine import *
from engines.pygal_engine import *
from engines.matplotlib_engine import *


# This list includes all supported chart presets.
# For every chart, there are two presets, one for matplotlib(m_*)
# and one for pygal(p_*).
PRESETS = [
    'm_bar_chart',
    'p_bar_chart',
    'm_scatter_chart',
    'p_scatter_chart',
    'm_line_chart',
    'p_line_chart'
]


# Defnies BaseModel for api input.
class Chart(BaseModel):
    preset: str 
    width: int 
    height: int


# App configuration.
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:3000',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Default api route.
@app.get('/')
def index():
    return {'data': 'Hello World'}


# Returns a list of all supported presets.
@app.get('/presets')
def presets():
    return PRESETS


# Manages chart and svg generation.
@app.post('/chart')
def chart(chart: Chart):
    if chart.preset == 'm_bar_chart':
        generate_m_bar_chart()
    elif chart.preset == 'p_bar_chart':
        generate_p_bar_chart()
    elif chart.preset == 'm_scatter_chart':
        generate_m_scatter_chart()
    elif chart.preset == 'p_scatter_chart':
        generate_p_scatter_chart()
    elif chart.preset == 'm_line_chart':
        generate_m_line_chart()
    elif chart.preset == 'p_line_chart':
        generate_p_line_chart()
    else:
        return {'error': 'The selected preset is not supported.'}
    resize_svg(str(chart.width), str(chart.height))
    return FileResponse('chart.svg')
