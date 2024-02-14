## Overview
This directory is designed to support a hackathon challenge that focuses on the development and integration of a gRPC server, a publisher, and a client using GoLang. It aims to provide a uniform environment for all participants by ensuring the use of consistent server startup commands, proto files, and network ports. The primary goal is to enable efficient real-time message exchange and handling through gRPC, which is a high-performance, open-source universal RPC framework.

### Components
- **gRPC Server**: Located in the `server-grpc` directory, this component acts as the endpoint for messages sent by the publisher.
- **Publisher**: Found in the `tester-grpc/publisher` directory, its role is to generate and send a random 1kB message to the server every 10 seconds.
- **Client**: Situated in the `tester-grpc/client` directory, it connects to the server to receive all messages dispatched.

### Getting Started
To start each component, navigate to its respective directory and run the `bash start.sh` script. This command is crucial for initiating the component. Make sure GoLang is installed and correctly set up on your machine.

#### Prerequisites
- GoLang version 1.21.6 or higher
- gRPC and Protocol Buffers installed on your system

#### Installation
1. Clone this repository onto your local machine.
2. Verify that GoLang is installed on your machine.
3. Execute `go mod tidy` in each component's directory to install the necessary Go modules.

#### Running the Components
1. **Server Startup**: Move to the `server-grpc` directory and run `bash start.sh` to start the server.
2. **Publisher Activation**: Navigate to the `tester-grpc/publisher` directory and execute `bash start.sh` to begin sending messages to the server.
3. **Client Initiation**: Go to the `tester-grpc/client` directory and run `bash start.sh` to start receiving messages from the server.

### Benchmarking
Participants are encouraged to run a sample benchmark located in the `tester-grpc/benchmark_1n` directory to evaluate the performance of their implementation. This benchmark tests the efficiency of message distribution from the publisher to multiple clients.

### Architecture
The architecture leverages gRPC for seamless communication between the server, publisher, and client. The publisher is responsible for generating a random string of 1024 characters for each message, effectively simulating the transmission of large data volumes over the network.

