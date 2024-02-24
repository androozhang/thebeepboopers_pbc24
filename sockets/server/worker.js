function createWorker() {
  return new MyWorker();
}

class MyWorker {
  constructor() {
    this.onmessage = this.onmessage.bind(this);
  }

  onmessage([message, clients, callback]) {
    // Replace this with your actual logic for processing the message
    const promises = clients.map(client => {
      return sendAsyncMessage(client, message)
        .then(() => {
        })
        .catch((error) => {
          console.error('Error sending message to client:', error);
        });
    });

    // Simulate some processing
    setTimeout(() => {
      // Confirm that the worker got the message
    }, 0);

    return Promise.all(promises);
  }
}

function distributeMessageInParallel(message, clients, callback) {
  const Worker1 = createWorker();
  const Worker2 = createWorker();
  const Worker3 = createWorker();
  const Worker4 = createWorker();
  // Calculate the midpoint of the array
  let quarter = Math.floor(clients.length / 4);
  let half = quarter * 2
  let lastQuarter = half + quarter
  // Split the array into two halves
  let firstQuarter = clients.slice(0, quarter);
  let secondQuarter = clients.slice(quarter, half);
  let thirdQuarter = clients.slice(half, lastQuarter);
  let fourthQuarter = clients.slice(lastQuarter);
  Worker1.onmessage([message, firstQuarter, callback]);
  Worker2.onmessage([message, secondQuarter, callback]);
  Worker3.onmessage([message, thirdQuarter, callback]);
  Worker4.onmessage([message, fourthQuarter, callback]);
  
}

// Simulated asynchronous function to send a message to a client
function sendAsyncMessage(client, message) {
  return new Promise((resolve, reject) => {
    // Simulate some asynchronous operation (e.g., database query, network request)
    setTimeout(() => {
      if (client.readyState === WebSocket.OPEN) {
        // If the client connection is open, send the message
        client.send(message, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        // If the client connection is not open, reject immediately
        reject('Client connection not open');
      }
    }, 0); // Simulated delay of 0 milliseconds
  });
}

module.exports = {
  createWorker,
  distributeMessageInParallel,
};