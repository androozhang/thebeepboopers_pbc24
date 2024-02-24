import os
import ast

os.chdir('sockets')

# Open the file in read mode
with open('results.csv', 'r') as file:
    # Read all lines from the file
    lines = file.readlines()

# Initialize empty lists to store data
starter1to1k_data = ast.literal_eval(lines[0].strip())
starter1kto1k_data = ast.literal_eval(lines[1].strip())
final1to1k_data = ast.literal_eval(lines[2].strip())
final1kto1k_data = ast.literal_eval(lines[3].strip())

import matplotlib.pyplot as plt

data_points = range(1, len(starter1to1k_data) + 1)

# Create the first figure
fig1 = plt.figure(figsize=(8, 6))

# Plotting the scatter plot for starter1to1k_data and final1to1k_data in the first figure
plt.scatter(data_points, starter1to1k_data, label='starter1to1k_data', color='blue')  # Set color for starter
plt.scatter(data_points, final1to1k_data, label='final1to1k_data', color='green')

# Adding labels and legend for the first figure
plt.xlabel('Data Points')
plt.ylabel('Values')
plt.legend()

# Show the first plot
plt.savefig('scatter_plot1to1k.png')

# Assuming the lengths of starter1kto1k_data and final1kto1k_data are the same
data_points_2 = range(1, len(starter1kto1k_data) + 1)

# Create the second figure
fig2 = plt.figure(figsize=(8, 6))

# Plotting the scatter plot for starter1kto1k_data and final1kto1k_data in the second figure
plt.scatter(data_points_2, starter1kto1k_data, label='starter1kto1k_data', color='blue')  # Use the same color as in the first plot
plt.scatter(data_points_2, final1kto1k_data, label='final1kto1k_data', color='green')  # Use the same color as in the first plot

# Adding labels and legend for the second figure
plt.xlabel('Data Points')
plt.ylabel('Values')
plt.legend()

# Show the second plot
plt.savefig('scatter_plot1kto1k.png')

fig3 = plt.figure(figsize=(8, 6))
plt.plot(data_points_2, final1kto1k_data, label='final1kto1k_data', color='red')  # Use a different color for the line graph
plt.xlabel('Data Points')
plt.ylabel('Values')
plt.legend()
plt.savefig('line_plot1kto1k.png')
