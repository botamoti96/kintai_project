
using Microsoft.CodeAnalysis.CSharp.Syntax;
using MySql.Data.MySqlClient;

namespace LoginAPI.Services{
    public class LoginService{
        private string _connectionString;
        private ILogger _logger;

        public LoginService(string _connectionString){
            this._connectionString = _connectionString;
            using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
            _logger = factory.CreateLogger("Program");
        }
        
        public string Login(LoginRequest loginRequest)
        {
            Console.WriteLine("ログイン処理開始します");
            Console.WriteLine(loginRequest.EmployeeId + ":" + loginRequest.Password);
            string message = "";
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    var command = new MySqlCommand("SELECT * FROM employee WHERE employee_id = @EmployeeId", connection);
                    command.Parameters.AddWithValue("@EmployeeId", loginRequest.EmployeeId);
                    var reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        var storedPasswordHash = reader["password"].ToString();
                        Console.WriteLine(storedPasswordHash);
                        // if (BCrypt.Net.BCrypt.Verify(loginRequest.Password, storedPasswordHash))
                        // {
                        //     message = "ログイン成功";
                        // }
                        if (storedPasswordHash == loginRequest.Password){
                            message = "ログイン成功";
                        }
                        else
                        {
                            message = "1. ログインに失敗しました";
                        }
                    }
                    else
                    {
                        message = "2. ログインに失敗しました";
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ログイン処理中にエラーが発生しました");
                message = "エラー";
            }
            return message;
        }
    }
}