using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace Hermes.Client_Console
{
    internal class TokenHelper
    {
        private static HttpClient _client = InitHttpClient();
        private const string TokenEndPoint = "connect/token";
        /// <summary>
        /// Get access token.
        /// </summary>
        /// <param name="userName">the username</param>
        /// <param name="password">the password</param>
        public static async Task<string> GetAccessToken(string userName, string password)
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

        internal static async Task<bool> Register(string userName, string password)
        {
            //ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
            try
            {
                var serializedUser = JsonSerializer.Serialize(new { UserName = userName, Password = password });
                var requestContent = new StringContent(serializedUser, Encoding.UTF8, "application/json");
                var response = await _client.PostAsync("https://localhost:7001/api/Users/Register", requestContent);
                response.EnsureSuccessStatusCode();
                
                if (response.IsSuccessStatusCode) return true;
                Console.ForegroundColor = ConsoleColor.DarkRed;
                Console.WriteLine(await response.Content.ReadAsStringAsync());
                Console.ForegroundColor = ConsoleColor.Blue;

                return false;
            }
            catch (Exception e)
            {
                Console.ForegroundColor = ConsoleColor.DarkRed;
                Console.WriteLine(e);
                Console.ForegroundColor = ConsoleColor.Blue;
                return false;
            }
         
        }
        private static HttpClient InitHttpClient()
        {
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback =
                    (_, _, _, _) => true
            };

            ServicePointManager.Expect100Continue = false;
            return _client = new HttpClient(handler);
        }
    }
}
