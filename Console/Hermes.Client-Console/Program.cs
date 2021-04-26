using System;
using System.Net.Http;
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
            Console.WriteLine("Register new account");
            Console.WriteLine("Please enter your name:");
            Console.ForegroundColor = ConsoleColor.White;
            var name = Console.ReadLine();

            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("Please enter your password:");
            Console.ForegroundColor = ConsoleColor.White; ;
            var password = Console.ReadLine();

            if (await TokenHelper.Register(name, password) == false)
            {
                Environment.Exit(-1);
            }
            var token = await TokenHelper.GetAccessToken( name, password);
            if (token == null)
            {
                Environment.Exit(-1);
            }

            // The port number(5001) must match the port of the gRPC server.
            Console.ForegroundColor = ConsoleColor.Blue;
            var channel = CreateAuthenticatedChannel($"https://localhost:5001", token);
            var client = new Chatter.ChatterClient(channel);
            Console.WriteLine("Type a message");
            Console.ForegroundColor = ConsoleColor.White;

            using var streaming = client.Chat();
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
                await streaming.RequestStream.WriteAsync(new SendRequest() { Message = message });
                message = Console.ReadLine();

            }
            await streaming.RequestStream.CompleteAsync();


        }

        //code taken from https://docs.microsoft.com/en-us/aspnet/core/grpc/authn-and-authz?view=aspnetcore-5.0
        private static GrpcChannel CreateAuthenticatedChannel(string address, string token)
        {
            static HttpClientHandler GetHttpClientHandler()
            {
                var httpHandler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback =
                        HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                };
                return httpHandler;
            }

            var credentials = CallCredentials.FromInterceptor((_, metadata) =>
            {
                if (!string.IsNullOrEmpty(token))
                {
                    metadata.Add("Authorization", $"Bearer {token}");
                }
                return Task.CompletedTask;
            });

            // SslCredentials is used here because this channel is using TLS.
            // CallCredentials can't be used with ChannelCredentials.Insecure on non-TLS channels.
            var channel = GrpcChannel.ForAddress(address, new GrpcChannelOptions
            {
                Credentials = ChannelCredentials.Create(new SslCredentials(), credentials),
                HttpHandler = GetHttpClientHandler()
            });
            return channel;
        }

        private static void CleanUpConsole()
        {
            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write(new string(' ', Console.WindowWidth));
            Console.SetCursorPosition(0, Console.CursorTop - 1);
        }
    }
}
