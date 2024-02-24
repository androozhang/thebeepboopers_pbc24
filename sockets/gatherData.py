import subprocess
import os
import time
import csv

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

def getTestResults(script_path, numberOfTrials, testCooldown):
    results = []
    for i in range(numberOfTrials):
        run_bash_script(script_path)
        time.sleep(testCooldown)
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

    numberOfTrials = 1
    testCooldownOneToMany = 1
    testCooldownManyToMany = 5

    finalResultsManyToMany = getTestResults(final_script_path_many_to_many, numberOfTrials, testCooldownManyToMany)
    time.sleep(15)
    starterResultsManyToMany = getTestResults(starter_script_path_many_to_many, numberOfTrials, testCooldownManyToMany)


    

    with open('resultsmanytomany.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(starterResultsManyToMany)
        writer.writerow(finalResultsManyToMany)

    
            
