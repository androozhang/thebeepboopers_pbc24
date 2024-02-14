package main

import (
	"context"
	"log"
	"math/rand"
	"time"

	pb "synoptic-tester/publisher/proto" // Assuming the proto package is correctly referenced

	"google.golang.org/grpc"
)

const (
	serverAddr   = "localhost:50051"
	publisherID  = 1
)

func generateRandomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(serverAddr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	client := pb.NewMessageServiceClient(conn)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	stream, err := client.Publish(ctx)
	if err != nil {
		log.Fatalf("could not publish: %v", err)
	}

	for {
		fixedMessage := generateRandomString(1024) // Generate a random string of 1024 characters for each message

		message := &pb.Message{
			Author: publisherID,
			Data:   fixedMessage,
		}

		if err := stream.Send(message); err != nil {
			log.Fatalf("Failed to send a message: %v", err)
		}

		log.Printf("Published message from %d", publisherID)
		time.Sleep(10 * time.Second)
	}
}
