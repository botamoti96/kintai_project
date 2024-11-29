using AttendanceAPI.Services;
using RequestAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// CORSポリシーを追加
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// その他のサービス登録
builder.Services.AddControllers();

// MySQL接続文字列
string connectionString = "Server=localhost;Database=kintai;User=kintaiu;Password=kintaip;";

// サービスを登録
builder.Services.AddScoped<AttendanceService>(provider =>
    new AttendanceService(connectionString));

builder.Services.AddScoped<RequestService>(provider =>
    new RequestService(connectionString)); // connectionStringを渡す

var app = builder.Build();

// CORSミドルウェアを追加
app.UseCors("AllowSpecificOrigins");

// その他のミドルウェア
app.UseRouting();

// APIエンドポイントを定義
app.MapGet("/", () => "Welcome to the Attendance API!");

// コントローラーエンドポイントを設定
app.MapControllers();

// 5000番ポートでリッスン
app.Urls.Add("http://localhost:5000");

// アプリケーション起動メッセージ
app.Lifetime.ApplicationStarted.Register(() =>
{
    Console.WriteLine("Application started and listening on http://localhost:5000");
    Console.WriteLine("Attendance API is ready!");
});

// アプリケーションを実行
app.Run();