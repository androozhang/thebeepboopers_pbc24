# WebSocket Multi-Client Messaging with Web Workers

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

To benchmark the system, you can run the provided benchmark script:

```bash
cd sockets/socket
sh start.sh
```
## Graphs
![scatter_plot1to1k](https://github.com/androozhang/thebeepboopers_pbc24/assets/82245268/7355677f-1c44-40cb-a023-e75cc33fdae4)

![scatter_plot1kto1k](https://github.com/androozhang/thebeepboopers_pbc24/assets/82245268/0e057f42-63bf-4525-b36c-478a8005ff6f)
