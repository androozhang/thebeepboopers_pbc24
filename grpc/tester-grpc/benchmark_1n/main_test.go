package main

import (
	"context"
	"log"
	"strconv"
	"sync"
	"testing"
	"time"

	pb "synoptic-tester/benchmark_1n/proto" // Assuming this is the correct path to the proto package

	"google.golang.org/grpc"
)

// Subscriber simulates a client subscribing to messages
type Subscriber struct {
	ID string
	// Add a channel to signal message receipt confirmation
	confirmChan chan bool
}

// Publisher simulates a client publishing messages
type Publisher struct{}

func (p *Publisher) PublishMessage(client pb.MessageServiceClient, message string) error {
	ctx := context.Background()
	// defer cancel()

	stream, err := client.Publish(ctx)
	if err != nil {
		return err
	}

	// Send a message
	req := &pb.Message{
		Author: 1, // Assuming an arbitrary author ID
		Data:   message,
	}
	if err := stream.Send(req); err != nil {
		log.Printf("Failed to send a message: %v", err)
		return err
	}
	log.Println("Successfully published message:", message)

	return nil
}

// SetupSubscribers creates and registers subscribers
func SetupSubscribers(client pb.MessageServiceClient, numSubscribers int) []*Subscriber {
	var subscribers []*Subscriber
	var wg sync.WaitGroup
	for i := 0; i < numSubscribers; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			sub := &Subscriber{ID: "sub_" + strconv.Itoa(id), confirmChan: make(chan bool)}
			// Simulate subscribing to the server
			ctx := context.Background() // Removed WithTimeout to prevent premature cancellation
			stream, err := client.Subscribe(ctx, &pb.SubscribeRequest{Subscriber: sub.ID})
			if err != nil {
				log.Printf("Failed to subscribe: %v", err)
				return
			}
			log.Printf("Subscriber %s successfully subscribed and is ready to receive messages.", sub.ID)
			subscribers = append(subscribers, sub)
			go func() {
				for {
					_, err := stream.Recv()
					if err != nil {
						log.Printf("Failed to receive a message for subscriber %s: %v", sub.ID, err)
						return
					} 
					sub.confirmChan <- true
				}
			}()
		}(i)
	}
	wg.Wait()
	return subscribers
}

const (
	serverAddr = "localhost:50051"
)
// BenchmarkPublishToSubscribers measures the latency of distributing a message to subscribers
func BenchmarkPublishToSubscribers(b *testing.B) {
	conn, err := grpc.Dial(serverAddr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		b.Fatalf("Failed to dial gRPC server: %v", err)
	}
	defer conn.Close()

	client := pb.NewMessageServiceClient(conn)
	subscribers := SetupSubscribers(client, 1000) // Adjusted to create 1000 subscribers
	publisher := &Publisher{}

	time.Sleep(15 * time.Second)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		start := time.Now()

		if err := publisher.PublishMessage(client, "Test message"); err != nil {
			b.Fatalf("Failed to publish message: %v", err)
		}
		log.Printf("Successfully published message to %d subscribers", len(subscribers))

		// Wait for all subscribers to confirm message receipt
		var confirmWg sync.WaitGroup
		confirmWg.Add(len(subscribers))
		for _, sub := range subscribers {
			go func(s *Subscriber) {
				defer confirmWg.Done()
				// Properly wait for a message confirmation from the subscriber
				// log.Printf("Waiting for confirmation from subscriber %s", s.ID)
				<-s.confirmChan
				// log.Printf("Subscriber %s successfully received the message.", s.ID)
			}(sub)
		}
		confirmWg.Wait()
		
		elapsed := time.Since(start).Nanoseconds()
		log.Printf("All subscribers have confirmed receipt of the message in %d ns", elapsed)
		b.ReportMetric(float64(elapsed), "ms/op")
	}
}
