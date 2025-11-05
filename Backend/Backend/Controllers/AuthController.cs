using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using TestfestAPI.Services;

namespace TestfestAPI.Controllers
{
    /// <summary>
    /// Handles authentication endpoints related to Github OAuth.
    /// 
    /// API Flow:
    /// 1. Frontend calls /api/auth/login -> Redirects to Github login page 
    /// 2. Github redirects back to /api/auth/signin-github with an authorization code
    /// 3. The backend exchanges that code for an access token and store it securely.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly OAuthService _oauthService;
        private readonly UserRoleService _userRoles;

        public AuthController(OAuthService oauthService, UserRoleService userRoleService)
        {
            _oauthService = oauthService;
            _userRoles = userRoleService;

        }

        
        /// <summary>
        /// STEP 1: 
        /// When the user clicks "login with github", the frontend calls this endpoint.
        /// 
        /// We build the Github authorization URL and redirect the user there.
        /// 
        /// The user will then log in on Github and approve our app permissions.
        /// </summary>
        /// <returns>A redirect response that sends the user to Github's OAuth authorization page.</returns>

        [HttpGet("login")]
        public IActionResult Login()
            => Redirect(_oauthService.BuildAuthorizeUrl());



        /// <summary>
        /// STEP 2:
        /// This is the redirect callback endpoint for Github to call after user login.
        /// 
        /// Github sends a temporary "code" (and "state" for security).
        /// We exchange the code for an access token using our OAuthService.
        /// 
        /// The token can then be stored in a cookie, session, or converted into a JWT.
        /// </summary>
        /// <param name="code">The authorization code provided by Github, used to request an access token</param>
        /// <param name="state">A random string originally sent to github to prevent CSRF attacks.
        /// It should match the state we generated when building the authorization URL.</param>
        /// <returns>A redirect response to the React frontend</returns>
        [HttpGet("signin-github")]
        public async Task<IActionResult> Callback([FromQuery] string code, [FromQuery] string state)
        {

            // if github didnt send a valid code, reject the request
            if (string.IsNullOrEmpty(code))
                return BadRequest("No code");


            // exchange the authorization code for a github access token
            var token = await _oauthService.ExchangeCodeForTokenAsync(code);

            // fetch github user information
            var githubUser = await _oauthService.GetGithubUserAsync(token);

            //extract both the ID and username from the response
            var githubId = githubUser.RootElement.GetProperty("id").GetInt64().ToString();
            var githubLogin = githubUser.RootElement.GetProperty("login").GetString();

            // lookup role in your database using github ID
            var role = await _userRoles.GetRoleByGitHubIdAsync(githubId);


            if (role is null)
                return Unauthorized("Bruker ikke registrert inne i systemet");


            if (role == Enums.UserRole.Bruker)
                return Forbid("Kun tjenesteeier/admin kan logge inn");


            // create a signed JWT containing the user's github ID and role
            var jwt = _oauthService.CreateJwtToken(
                githubId,
                githubLogin,
                new[] { role.ToString() }
                );


            // store JWT securely in a HttpOnly cookie
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Secure = true, // HTTPS only
                Expires = DateTimeOffset.UtcNow.AddHours(2)
            });


            // redirect back to our React frontend (on Vite) 
            return Redirect("http://localhost:5173/?loggedIn=true");
        }



        /// <summary>
        /// STEP 3 (optional):
        /// Retrieves the authenticated user's Github profile data using their stored access token.
        /// 
        /// This endpoint is useful for verifying the user's identity or fetching their Github info after login.
        /// </summary>
        /// <returns>Returns a <see cref="200 OK"/> response with the user's github profile datea if authenticated,
        /// or <see cref="401 Unauthorized"/> if no valid token is present.</returns>

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            // try to retrieve the github token from cookies
            if (!Request.Cookies.TryGetValue("github_token", out var token))
                return Unauthorized("Ikke logget inn");

            // use the OAuth service to fetch the user's github profile data.
            var user = await _oauthService.GetGithubUserAsync(token);

            // return the raw JSON response from github for now.
            return Ok(user.RootElement);
        }



        // jwt-cookie gets deleted once you log out
        [HttpPost("logout")] 
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok();
        }
    }
}
