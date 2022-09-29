from fastapi import FastAPI
from fastapi.responses import FileResponse
import random
import matplotlib.pyplot as plt


app = FastAPI()


@app.get('/')
def index():
    return {'data': 'Hello World'}


@app.get('/example/')
def example():
    x = []
    y = []
    for i in range(100):
        x.append(i)
        y.append(random.randint(0, i))
    plt.plot(x, y)
    plt.savefig('chart.png')
    plt.close()
    return FileResponse('chart.png')