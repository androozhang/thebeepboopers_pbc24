# WebSocket Multi-Client Messaging with Web Workers - Synoptic Bounty 1

## Overview

This project demonstrates a WebSocket-based multi-client messaging system, utilizing Web Workers to enhance concurrency and employing asynchronous operations to optimize latency.

## Features

- WebSocket communication between clients and a server.
- Utilization of Web Workers for multi-threading to enhance concurrency.
- Asynchronous operations to optimize latency during message processing.

## Why Web Workers?

Web Workers provide a way to run scripts in the background, separate from the main thread. This project leverages Web Workers to handle message sending concurrently, improving the overall performance and responsiveness of the system.

## Why Async Operations and Map?

1. **Async Operations**: Asynchronous operations are used to simulate non-blocking behavior, allowing the system to continue processing other tasks while waiting for I/O operations (such as sending messages) to complete. This prevents the system from getting blocked during the interactions.

2. **Map Function**: The `Array.map` function is employed to create an array of promises, each representing the asynchronous task of sending a message to a client. This approach enables parallel execution of these tasks, enhancing efficiency and reducing latency.

## Benchmarking

To benchmark the system, you can run the provided benchmark script with the server hosted:

1 to 1000 
```bash
cd sockets/tester/benchmark_1n
sh one_to_many.sh
```
1000 to 1000
```bash
cd sockets/tester/benchmark_1n
sh many_to_many.sh
```
gatherData.py is a Python script that repeatedly calls a bash script which opens one terminal to start the server and one terminal to call the benchmark 
It does this for a certain number of trials for the starter code one to many and many to many and our final code one to many and many to many
The benchmark results are written to a text file which is read and the runtime is saved into a CSV file which will end up with all the runtime data of the 4 categories
Running gatherData.py
Prerequisites: We used goblin-terminal for the simulated terminals which is only available on Linux - https://www.wikihow.com/Install-Gnome-on-Ubuntu
Then just run the gatherData.py file


## Graphs
### Latency Comparison: Latency of one publisher and 1000 subscribers
![scatter_plot1to1k](https://github.com/androozhang/thebeepboopers_pbc24/assets/82245268/7355677f-1c44-40cb-a023-e75cc33fdae4)

### Latency Comparison: Latency of 1000 publisher and 1000 subscribers
![scatter_plot1kto1k](https://github.com/androozhang/thebeepboopers_pbc24/assets/82245268/0e057f42-63bf-4525-b36c-478a8005ff6f)

## Youtube
https://www.youtube.com/watch?v=snVub3UDGFk&ab_channel=Kyle

## 1

Participant/Team Name
Andrew Zhang, Alan Wang, Kyle Vong, Andriy Luchko

## 2

Project Name
WebSocket Multi-Client Messaging with Web Workers

## 3

Link to Tweet
https://twitter.com/kxle_v/status/1761404054989905953?s=42

## 4

Brief description of your project (One Paragraph - 500 Words)
This project demonstrates a WebSocket-based multi-client messaging system, utilizing Web Workers to enhance concurrency and employing asynchronous operations to optimize latency. Web Workers provide a way to run scripts in the background, separate from the main thread. This project leverages Web Workers to handle message sending concurrently, improving the overall performance and responsiveness of the system. Asynchronous operations are used to simulate non-blocking behavior, allowing the system to continue processing other tasks while waiting for I/O operations (such as sending messages) to complete. This prevents the system from getting blocked during the interactions.

## 5

Country / Region
USA

## 6

Technical Solution your dApp is based on?
Multithreading and Async

## 7

Which theme best describes your dApp?
N/A

## 8

What sponsor bounty you're applying to? (Note: Can me multiple)
Synoptic Bounty 1

## 9

Link to pitch deck (MUST INCLUDE LIVE DEMO LINK)
https://docs.google.com/presentation/d/1hPn_EuL-6sEYXDa9Gf8ZKBBtVAIgblMdhRD0ecgHO14/edit#slide=id.g2a7fc65ecbe_0_125

## 10

Deployed Smart Contract Address
N/A

## 11

Deployed to Any other Chain Yes/No
N.A

## 12

Is this part of a larger / past project? If yes, please include repo for larger project. Note: this can only help you. We are simply curious to see integration plans for your hackathon project.
No
