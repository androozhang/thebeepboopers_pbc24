package main

import (
	"log"
	"net"
	pb "server-grpc/main/proto"
	"sync"
	"time"

	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// server is used to implement MessageService.
type server struct {
	pb.UnimplementedMessageServiceServer
	subscribers sync.Map // to store subscribers
}

// Publish implements MessageService.Publish
func (s *server) Publish(stream pb.MessageService_PublishServer) error {
	log.Println("Publisher connected")
	for {
		in, err := stream.Recv()
		if err != nil {
			log.Printf("Failed to receive a message : %v", err)
			return err
		}
		log.Printf("Received message from author %d: %s", in.Author, in.Data)
		s.subscribers.Range(func(key, value interface{}) bool {
			subscriberStream, ok := value.(pb.MessageService_SubscribeServer)
			if !ok {
				log.Printf("Error casting subscriber stream")
				return true
			}
			if err := subscriberStream.Send(in); err != nil {
				log.Printf("Failed to send message to subscriber: %v", err)
				s.subscribers.Delete(key)
			}
			return true
		})
	}
	return nil
}

// Subscribe implements MessageService.Subscribe
func (s *server) Subscribe(req *pb.SubscribeRequest, stream pb.MessageService_SubscribeServer) error {
	subscriberKey := req.Subscriber
	log.Printf("Client %s connected", subscriberKey)
	ctx := stream.Context()

	// Add this subscriber to the map
	s.subscribers.Store(subscriberKey, stream)

	// Keep the connection open for 15 minutes or until the client disconnects
	select {
	case <-ctx.Done():
		log.Printf("Client %s disconnected", subscriberKey)
		s.subscribers.Delete(subscriberKey)
	case <-time.After(15 * time.Minute):
		log.Printf("Closing connection for client %s after 15 minutes", subscriberKey)
		s.subscribers.Delete(subscriberKey)
	}
	return nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterMessageServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
