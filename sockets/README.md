## Overview
This directory is part of a hackathon challenge that demonstrates a simple implementation of a server, a publisher, and a client using Bun.js. The purpose of this setup is to showcase real-time message passing and handling using sockets, leveraging the high-performance JavaScript runtime, Bun.js. When implementing your own server for this challenge, ensure it uses port 8001 for the publisher and port 8002 for the client to maintain consistency across all submissions.

### Components
- **Socket Server**: Located in the `server` directory, it acts as the receiver of messages published by the publisher. It listens on two ports: port 8001 for publishers to send messages and port 8002 for clients to receive messages.
- **Publisher**: Found in the `tester/publisher` directory, it generates and sends a random 1kB message to the server every 10 seconds, using port 8001.
- **Client**: Resides in the `tester/client` directory, it connects to the server using port 8002 and listens for all messages sent to it.

### Getting Started
To run each component, navigate to its respective directory and execute the `bash start.sh` script. This will start the component. Ensure you have Bun.js installed and configured correctly on your system.

#### Prerequisites
- Bun.js installed on your system

#### Installation
1. Clone this repository to your local machine.
2. To install Bun.js, run the following command in your terminal:
   ```
   curl -fsSL https://bun.sh/install | bash
   ```
3. Ensure you have Bun.js installed.
4. Install the required packages by running `bun install` in each component's directory.

#### Running the Components
1. **Start the Server**: Navigate to `server` and run `bash start.sh`. Ensure the server is configured to use port 8001 for publishers and port 8002 for clients.
2. **Start the Publisher**: Navigate to `tester/publisher` and run `bash start.sh`. This will start sending messages to the server on port 8001.
3. **Start the Client**: Navigate to `tester/client` and run `bash start.sh` to start listening for messages from the server on port 8002.

### Architecture
This implementation uses sockets for communication between the server, publisher, and client. The publisher generates a random string of 1024 characters for each message, simulating a real-world scenario where large amounts of data are transferred over the network. It is crucial that the server listens on the specified ports to ensure seamless communication between the components.

