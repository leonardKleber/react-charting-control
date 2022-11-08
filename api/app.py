import random
import matplotlib.pyplot as plt
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import svgutils.transform as sg
import sys


class Chart(BaseModel):
    preset: str
    width: int
    height: int


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:3000',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    return {'data': 'Hello World'}


@app.post('/chart/')
def chart(chart: Chart):
    if chart.preset == 'test':
        x = []
        y = []
        for i in range(100):
            x.append(i)
            y.append(random.randint(0, i))
        plt.plot(x, y)
        plt.savefig('chart.svg')
        plt.close()
        fig = sg.fromfile('chart.svg')
        fig.set_size((str(chart.width), str(chart.height)))
        fig.save('chart.svg')
        return FileResponse('chart.svg')
    else:
        return chart