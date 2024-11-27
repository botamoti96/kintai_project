using AttendanceAPI.Services;
using RequestAPI.Services;

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
string connectionString = "Server=localhost;Database=kintai;User=kintaiu;Password=kintaip;";

// サービスを登録
builder.Services.AddScoped<AttendanceService>(provider =>
    new AttendanceService(connectionString));

// RequestService用の接続文字列をIConfigurationから取得して渡す
builder.Services.AddScoped<RequestService>(provider =>
    new RequestService(connectionString)); // connectionStringを渡す

var app = builder.Build();

// CORSミドルウェアを追加
app.UseCors("AllowSpecificOrigins");

// その他のミドルウェア
app.UseRouting();

// APIエンドポイントを定義（例: トップページのエンドポイント）
app.MapGet("/", () => "Welcome to the Attendance API!");

// コントローラーエンドポイントを設定
app.MapControllers();

// 5000番ポートでリッスン
app.Urls.Add("http://localhost:5000");

app.Run();