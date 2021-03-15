using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Hermes.Client_Console.Protos;

namespace Hermes.Client_Console
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("Welcome to Hermes chat client");
            Console.WriteLine("Please enter your name:");
            Console.ForegroundColor = ConsoleColor.White; ;
            var name = Console.ReadLine();
            // The port number(5001) must match the port of the gRPC server.
            Console.ForegroundColor = ConsoleColor.Blue;
             var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Chatter.ChatterClient(channel);
            Console.WriteLine("Type a message");
            Console.ForegroundColor = ConsoleColor.White;
           


            using var streaming = client.Chat(new Metadata { new("Name", name) });
            var _ = Task.Run(async () =>
            {
                while (await streaming.ResponseStream.MoveNext())
                {
                    Console.ForegroundColor = ConsoleColor.DarkGreen;
                    Console.WriteLine($"{streaming.ResponseStream.Current.Message}");
                    Console.ForegroundColor = ConsoleColor.White;

                }
            });
            await streaming.RequestStream.WriteAsync(new SendRequest() { Message = string.Empty });
            var message = Console.ReadLine();

            while (!string.Equals(message, "q!", StringComparison.OrdinalIgnoreCase))
            {
                CleanUpConsole();
                await streaming.RequestStream.WriteAsync(new SendRequest() { Message = message });
                message = Console.ReadLine();

            }
            await streaming.RequestStream.CompleteAsync();


        }

        private static void CleanUpConsole()
        {
            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write(new string(' ', Console.WindowWidth));
            Console.SetCursorPosition(0, Console.CursorTop - 1);
        }
    }
}
