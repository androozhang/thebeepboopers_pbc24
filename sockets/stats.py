import os
import ast
import numpy as np

os.chdir('sockets')

# Open the file in read mode
with open('resultsReusingWorkers.csv', 'r') as file:
    # Read all lines from the file
    lines = file.readlines()

# Initialize empty lists to store data
starter1to1k_data = ast.literal_eval(lines[0].strip())
starter1kto1k_data = ast.literal_eval(lines[1].strip())
final1to1k_data = ast.literal_eval(lines[2].strip())
final1kto1k_data = ast.literal_eval(lines[3].strip())

# Convert data to NumPy arrays for easy calculations
starter1to1k_array = np.array(starter1to1k_data)
starter1kto1k_array = np.array(starter1kto1k_data)
final1to1k_array = np.array(final1to1k_data)
final1kto1k_array = np.array(final1kto1k_data)

# Calculate mean and variance for each dataset
starter1to1k_mean = np.mean(starter1to1k_array)
starter1to1k_variance = np.var(starter1to1k_array)

starter1kto1k_mean = np.mean(starter1kto1k_array)
starter1kto1k_variance = np.var(starter1kto1k_array)

final1to1k_mean = np.mean(final1to1k_array)
final1to1k_variance = np.var(final1to1k_array)

final1kto1k_mean = np.mean(final1kto1k_array)
final1kto1k_variance = np.var(final1kto1k_array)

# Print the results
print("Starter Mean:", starter1to1k_mean)
print("Starter Variance:", starter1to1k_variance)

print("Starter Mean:", starter1kto1k_mean)
print("Starter Variance:", starter1kto1k_variance)

print("Final Mean:", final1to1k_mean)
print("Final Variance:", final1to1k_variance)

print("Final Mean:", final1kto1k_mean)
print("Final Variance:", final1kto1k_variance)
