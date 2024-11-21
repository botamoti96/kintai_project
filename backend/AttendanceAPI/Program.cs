using AttendanceAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// MySQL接続文字列
string connectionString = "Server=localhost;Database=kintai;User=root;Password=root;";

// サービスを登録
builder.Services.AddSingleton(new AttendanceService(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.MapControllers();

// 5000番ポートでリッスン
app.Urls.Add("http://localhost:5000");

app.Run();
