using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; // MySQLの接続に必要
using BCrypt.Net; // パスワードのハッシュ化に必要

namespace YourNamespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost;Database=kintai_db;User=root;Password=mossan";

        // ログイン用のPOSTメソッド
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest loginRequest)
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "サーバーエラー", error = ex.Message });
            }
        }
    }
}