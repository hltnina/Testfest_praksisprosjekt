using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens.Experimental;
using System.Text;
using TestfestAPI.DatabaseContext;
using TestfestAPI.Services;
using AspNet.Security.OAuth.GitHub;

var builder = WebApplication.CreateBuilder(args);

//DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 38))));


builder.Services.AddControllers();


// JWT (API)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(jwtOptions =>
    {
        var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

        jwtOptions.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };

    });


// Oauth (Cookie)
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = "Github"; // challenge = Oauth

})
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, cookieOpts =>
    {
        cookieOpts.Cookie.HttpOnly = true;
        cookieOpts.Cookie.SameSite = SameSiteMode.Strict;
        cookieOpts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    })
    .AddOAuth("Github", oAuthOptions =>
    {
        oAuthOptions.ClientId = builder.Configuration["Github:ClientId"];
        oAuthOptions.ClientSecret = builder.Configuration["Github:ClientSecret"];
        oAuthOptions.CallbackPath = "/signin-github"; // must match github app
        oAuthOptions.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
        oAuthOptions.TokenEndpoint = "https://github.com/login/oauth/access_token";
        oAuthOptions.UserInformationEndpoint = "https://api.github.com/user";
        oAuthOptions.Scope.Add("read:user");
        oAuthOptions.Scope.Add("repo"); // create issues
        oAuthOptions.Scope.Add("user:email"); 
        oAuthOptions.ClaimsIssuer = "Oauth2-Github";
       
        oAuthOptions.ClaimActions.MapJsonKey("sub", "id");
        oAuthOptions.ClaimActions.MapJsonKey("login", "login");
    });




// HttpClient
builder.Services.AddHttpClient<OAuthService>();


//services
builder.Services.AddScoped<OAuthService>();
builder.Services.AddScoped<UserRoleService>();
//builder.Services.AddHttpClient<GitHubService>();


//CORS: localhost:5173
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policyBuilder =>
    {
        policyBuilder.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()); 
        
    });
});






var app = builder.Build();



// Configure the HTTP request pipeline.



app.UseHsts();
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
