import sys
import svgutils.transform as sg


# Resizes the chart.svg that has been generated into the api folder.
def resize_svg(width, height):
    fig = sg.fromfile('chart.svg')
    fig.set_size((width, height))
    fig.save('chart.svg')
