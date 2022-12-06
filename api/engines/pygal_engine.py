import os
import pygal
import random


# Generates a bar chart with matplotlib.
def generate_p_bar_chart():
    # TODO: Fetch the data for the chart.
    # For now, this step will be replaced by a random generator.
    x = random.randint(0, 10)
    y = random.randint(0, 10)
    z = random.randint(0, 10)
    data = [x, y, z]
    # End of random generator

    # TODO: Fetch the name of the labels for the bar chart.
    # For now, there will be 3 labels numerated from 1 - 3.
    labels = [1, 2, 3]

    # Remove chart.svg in case it exists.
    if os.path.exists('chart.svg'):
        os.remove('chart.svg')

    # Create the chart and save it as svg.
    chart = pygal.Bar()
    chart.x_labels = labels
    chart.add('Dataset', data)
    chart.render_to_file('chart.svg')


# Generates a scatter chart with matplotlib.
def generate_p_scatter_chart():
    # TODO: Fetch the data for the chart.
    # For now this step will be replaced by a random generator.
    data = []
    for i in range(100):
        data.append((i, random.randint(0, i)))
    # End of random generator

    # Remove chart.svg in case it exists.
    if os.path.exists('chart.svg'):
        os.remove('chart.svg')

    # Create the chart and save it as svg.
    chart = pygal.XY(stroke=False)
    chart.add('Dataset', data)
    chart.render_to_file('chart.svg')


# Generates a line chart with matplotlib.
def generate_p_line_chart():
    # TODO: Fetch the data for the chart.
    # For now this step will be replaced by a random generator.
    x = []
    y = []
    for i in range(100):
        x.append(i)
        y.append(random.randint(0, i))
    # End of random generator

    # Remove chart.svg in case it exists.
    if os.path.exists('chart.svg'):
        os.remove('chart.svg')

    # Create the chart and save it as svg.
    chart = pygal.Line()
    chart.x_labels = x 
    chart.add('Dataset', y)
    chart.render_to_file('chart.svg')
