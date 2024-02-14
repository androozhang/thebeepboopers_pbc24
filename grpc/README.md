## Overview
This directory supports a hackathon challenge, focusing on the implementation of a gRPC server, a publisher, and a client using GoLang. It's crucial for ensuring a standardized environment across all participant implementations, emphasizing the use of identical server startup commands, proto files, and network ports. This setup aims to facilitate efficient real-time message exchange and handling through gRPC, a high-performance, open-source universal RPC framework.

### Components
- **gRPC Server**: Found within the `server-grpc` directory, this component is the endpoint for messages sent by the publisher.
- **Publisher**: Located in the `tester-grpc/publisher` directory, it is tasked with creating and dispatching a random 1kB message to the server every 10 seconds.
- **Client**: Positioned in the `tester-grpc/client` directory, it establishes a connection with the server to receive all messages sent.

### Getting Started
To initiate each component, proceed to its specific directory and execute the `bash start.sh` script. This standardized command is essential for starting the component. Ensure that GoLang is installed and properly configured on your system.

#### Prerequisites
- GoLang version 1.21.6 or later
- Installed gRPC and Protocol Buffers

#### Installation
1. Clone this repository to your local device.
2. Confirm the installation of GoLang on your system.
3. Run `go mod tidy` in the directory of each component to install the required Go modules.

#### Running the Components
1. **Server Startup**: Navigate to `server-grpc` and execute `bash start.sh` to launch the server.
2. **Publisher Activation**: Go to `tester-grpc/publisher` and run `bash start.sh` to start sending messages to the server.
3. **Client Initiation**: Head to `tester-grpc/client` and execute `bash start.sh` to begin receiving messages from the server.

### Architecture
This setup utilizes gRPC for direct communication between the server, publisher, and client. The publisher generates a random string of 1024 characters for each message, simulating the transfer of large data volumes over the network.

