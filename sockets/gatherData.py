import subprocess
import os
import time
import csv
import socket

def is_port_closed(host, port):
    try:
        # Try to open a connection to the specified port
        with socket.create_connection((host, port), timeout=1):
            return False  # Port is still open
    except (socket.timeout, ConnectionRefusedError):
        return True  # Port is closed

def wait_for_port_closure(host, port):
    while not is_port_closed(host, port):
        time.sleep(1)

def run_bash_script(script_path):
    subprocess.run(['bash', script_path])

def is_float(string):
    if string.replace(".", "").isnumeric():
        return True
    else:
        return False
    
def parseBenchmarkCompletion(completionLine):
    lastToken = completionLine.split(" ")[-1]
    lastToken = lastToken[:-3]
    # we did not get a numerical value which means bench mark did not complete and the tested code failed
    if not is_float(lastToken):
        return -1
    
    return float(lastToken)

def getTestResults(script_path, numberOfTrials):
    host = '127.0.0.1'
    port = 8001
    results = []
    for i in range(numberOfTrials):
        run_bash_script(script_path)
        wait_for_port_closure(host, port)
        with open(log_path) as f:
            for line in f:
                pass
            last_line = line
            results.append(parseBenchmarkCompletion(last_line))

    return results


if __name__ == "__main__":

    starter_script_path_one_to_many = 'starter_testing_script_one_to_many.sh'
    starter_script_path_many_to_many = 'starter_testing_script_many_to_many.sh'

    final_script_path_one_to_many = 'final_testing_script_one_to_many.sh'
    final_script_path_many_to_many = 'final_testing_script_many_to_many.sh'

    log_path = 'tester/benchmark_1n/log.txt'

    os.chdir('sockets')

    numberOfTrials = 100

    finalResultsManyToMany = getTestResults(final_script_path_many_to_many, numberOfTrials)
    finalResultsOneToMany = getTestResults(final_script_path_one_to_many, numberOfTrials)
    starterResultsManyToMany = getTestResults(starter_script_path_many_to_many, numberOfTrials)
    starterResultsOneToMany = getTestResults(starter_script_path_one_to_many, numberOfTrials)



    

    with open('resultsReusingWorkers.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(starterResultsOneToMany)
        writer.writerow(starterResultsManyToMany)
        writer.writerow(finalResultsOneToMany)
        writer.writerow(finalResultsManyToMany)
        
    
            
