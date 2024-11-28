using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; // MySQLの接続に必要
using BCrypt.Net; // パスワードのハッシュ化に必要

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly string _connectionString = "Server=localhost;Database=kintai_db;User=root;Password=mossan";

    // ユーザー登録用のPOSTメソッド
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest registerRequest)
    {
        // パスワードをハッシュ化
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password);

        // データベース接続
        using (var connection = new MySqlConnection(_connectionString))
        {
            connection.Open();

            // SQLクエリを準備して実行
            var command = new MySqlCommand("INSERT INTO Users (EmployeeId, PasswordHash) VALUES (@EmployeeId, @PasswordHash)", connection);
            command.Parameters.AddWithValue("@EmployeeId", registerRequest.EmployeeId);
            command.Parameters.AddWithValue("@PasswordHash", hashedPassword);
            command.ExecuteNonQuery();
        }

        return Ok(new { message = "ユーザー登録成功" });
    }

    // ログイン用のPOSTメソッド
    [HttpPost("login")]
    public IActionResult Post([FromBody] LoginRequest loginRequest)
    {
        using (var connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            var command = new MySqlCommand("SELECT * FROM Users WHERE EmployeeId = @EmployeeId", connection);
            command.Parameters.AddWithValue("@EmployeeId", loginRequest.EmployeeId);

            var reader = command.ExecuteReader();

            if (reader.Read())
            {
                var storedPasswordHash = reader["PasswordHash"].ToString();

                if (BCrypt.Net.BCrypt.Verify(loginRequest.Password, storedPasswordHash))
                {
                    return Ok(new { message = "ログイン成功" });
                }
                else
                {
                    return Unauthorized(new { message = "パスワードが間違っています" });
                }
            }
            else
            {
                return NotFound(new { message = "社員番号が存在しません" });
            }
        }
    }
}

public class RegisterRequest
{
    public string EmployeeId { get; set; } = "";
    public string Password { get; set; } = "";
}

public class LoginRequest
{
    public string EmployeeId { get; set; } = "";
    public string Password { get; set; } = "";
}