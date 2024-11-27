using AttendanceAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// CORSポリシーを追加
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // 許可するオリジン
              .AllowAnyHeader()                    // 任意のヘッダーを許可
              .AllowAnyMethod();                   // 任意のHTTPメソッドを許可
    });
});

// その他のサービス登録
builder.Services.AddControllers();

// MySQL接続文字列
string connectionString = "Server=localhost;Database=kintai;User=root;Password=nakasone3;";

// サービスを登録
builder.Services.AddSingleton(new AttendanceService(connectionString));

var app = builder.Build();

// CORSミドルウェアを追加
app.UseCors("AllowSpecificOrigins");

// その他のミドルウェア
app.UseRouting();
app.MapControllers();

// 5000番ポートでリッスン
app.Urls.Add("http://localhost:5000");

app.Run();
