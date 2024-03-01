using ChatBackend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//cors settings
app.UseCors(options =>
{
    options.WithOrigins("http://192.168.0.21:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
});

app.MapHub<ChatHub>("/chatHub");

//api endpoints
app.MapGet("/", () =>"Hello from the chat API");
app.MapGet("/test", () => "Testing the chat API endpoints");

app.Run();
