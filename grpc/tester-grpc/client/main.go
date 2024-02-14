package main

import (
	"context"
	"log"
	"time"

	pb "synoptic-tester/client/proto"

	"google.golang.org/grpc"
)
const (
	serverAddr = "localhost:50051"
)

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(serverAddr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewMessageServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Minute)
	defer cancel()

	stream, err := c.Subscribe(ctx, &pb.SubscribeRequest{Subscriber: "client1"})
	if err != nil {
		log.Fatalf("could not subscribe: %v", err)
	}
	log.Println("Successfully subscribed to the server")

	for {
		in, err := stream.Recv()
		if err != nil {
			log.Fatalf("Failed to receive a message : %v", err)
		}
		log.Printf("Received message from author %d: %s", in.Author, in.Data)
	}
}
