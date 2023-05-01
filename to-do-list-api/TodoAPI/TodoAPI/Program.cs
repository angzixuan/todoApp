using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using TodoAPI.Data;
using TodoAPI.Data.Model;
using TodoAPI.Model;
using TodoAPI.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TodoAPI" ,Description = "Magical Todo ", Version = "v1" });
});
// inject databse to IoC for DI
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<MongoDBService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapGet("/todoitems", TodoDBService.GetAllTodos);

app.MapPost("/todoitems", TodoDBService.CreateTodo);

app.MapPut("/todoitems/{id}",TodoDBService.UpdateTodo);

app.MapDelete("/todoitems/{id}", TodoDBService.DeleteTodo);

app.Run();



