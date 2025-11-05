using System.Security.Claims;
using System.Text.Json;
using TestfestAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TestfestAPI.Services
{
    /// <summary>
    /// Handles all OAuth communication between our backend and Github's OAuth 2.0 API.
    /// This service is responsible for:
    /// - Building the Github authorization URL
    /// - exchanging the authorization code for an access token
    /// - (Later) Fetching data from Github using that token
    /// </summary>
    public class OAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public OAuthService(IConfiguration configuration, HttpClient http)
        {
            _configuration = configuration;
            _httpClient = http;
        }

        /// <summary>
        /// Builds the github OAuth login URL that users will be redirected to. 
        /// 
        /// The URL includes parameteres such as:
        /// - client_id: Identifies our github OAuth App
        /// - redirect_uri: where github should send the user after login
        /// - scope: what permissions we're asking for (e.g., read:user, repo)
        /// - state: random unique string to prevent CSRF attacks
        /// 
        /// Example result:
        /// https://github.com/login/oauth/authorize?client_id=123&redirect_uri=https://localhost:7256/signin-github
        /// </summary>
        /// <returns></returns>
        public string BuildAuthorizeUrl()
        {
            var queryParameter = new Dictionary<string, string>
            {
                ["client_id"] = _configuration["Github:ClientId"],
                ["redirect_uri"] = _configuration["Github:RedirectUri"],
                ["scope"] = _configuration["Github:Scope"],
                ["state"] = Guid.NewGuid().ToString(), // unique per request to protect against CSRF attacks
                ["allow_signup"] = "false" // optional: Disallow github signups during login
            };


            // build a proper query string (note: no spaces between key and value)
            var queryString = string.Join("&", queryParameter.Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value)}"));

            return $"https://github.com/login/oauth/authorize?{queryString}";
        }




        /// <summary>
        /// Exchanges the temporary authorization code (sent by Github after login) for a real access token.
        /// 
        /// Step 2 of the OAuth flow: Github -> (code) -> Backend -> (POST) -> Github -> (token)
        /// 
        /// This token allows our backend to call the Github API on behalf of the user.
        /// </summary>
        /// <param name="code">The temporary code Github sent to our redirect URL.</param>
        /// <returns>The Github access token string.</returns>
        public async Task<string> ExchangeCodeForTokenAsync(string code)
        {
            var formData = new Dictionary<string, string>
            {
                ["client_id"] = _configuration["Github:ClientId"],
                ["client_secret"] = _configuration["Github:ClientSecret"],
                ["code"] = code,
                ["redirect_uri"] = _configuration["Github:RedirectUri"]
            };

            using var content = new FormUrlEncodedContent(formData);

            // Github endpoint for exchanging code -> token
            var response = await _httpClient.PostAsync("https://github.com/login/oauth/access_token", content);
            response.EnsureSuccessStatusCode();

            // response is form-encoded, e.g.,: "access_token=...&scope...&token_type=bearer"
            var body = await response.Content.ReadAsStringAsync(); // form-encoded


            // parse access_token from the response
            return System.Web.HttpUtility.ParseQueryString(body)["access_token"];
        }


        /// <summary>
        /// STEP 3 (optional):
        /// Once logged in, use the stored Github token to get the user's profile data. 
        /// This helps you identify the user and optionally create a local user record.
        /// </summary>
        /// <param name="accessToken"></param>
        /// <returns></returns>
        public async Task<JsonDocument> GetGithubUserAsync(string accessToken)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.github.com/user");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.UserAgent.ParseAdd("TestfestApp");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return JsonDocument.Parse(json);
        }



        public string CreateJwtToken(string githubId, string login, IEnumerable<string> roles)
        {
            // Claims = user identity + role info embedded in the token
            var claims = new List<Claim>
            {
                new("sub", githubId), // "sub" = subject = the unique identifier (here: Github ID)
                new("login", login), // custom claim for the Github username
                new(ClaimTypes.Name, login) // ASP.NET identity Name claim
            };


            // adds multiple role claims (e.g., "tjenesteier", "admin")
            foreach (var r in roles) claims.Add(new Claim(ClaimTypes.Role, r));


            // signing key 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var expiry = int.Parse(_configuration["Jwt:EXPIRATION_MINTUES"]);

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            // token creation
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiry),
                signingCredentials: creds);


            // converts it to a compact string form
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
        

            
        
    

