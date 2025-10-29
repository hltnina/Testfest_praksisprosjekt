using Microsoft.EntityFrameworkCore;
using TestfestAPI.DatabaseContext;

var builder = WebApplication.CreateBuilder(args);

// MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 38))));


builder.Services.AddControllers();





var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHsts();
app.UseHttpsRedirection();




app.UseAuthorization();

app.MapControllers();

app.Run();
