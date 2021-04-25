using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace Hermes.Client_Console
{
    public class TokenHelper
    {
        private const string TokenEndPoint = "connect/token";
        /// <summary>
        /// Get access token.
        /// </summary>
        /// <param name="userName">the username</param>
        /// <param name="password">the password</param>
        public static async Task<string> GetAccessToken( string userName, string password)
        {
            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
            var httpClientHandler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (_, _, _, _) => true
            };
            var tokOps = new TokenClientOptions
            {
                Address = $"https://localhost:7001/{TokenEndPoint}",
                ClientId = "chat_console_client",
                ClientSecret = "superdupersecret"
            };
            var tokenClient = new TokenClient(new HttpMessageInvoker(httpClientHandler), tokOps);
            var passwordTokenAsync = await tokenClient
                .RequestPasswordTokenAsync(userName, password,
                    $"hermes");
            if (!passwordTokenAsync.IsError) return passwordTokenAsync.AccessToken;
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.WriteLine(passwordTokenAsync.Error);
            Console.ForegroundColor = ConsoleColor.Blue;
            return null;

        }
    }
}
