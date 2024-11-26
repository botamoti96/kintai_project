using MySql.Data.MySqlClient;
using AttendanceAPI.Models;
using System.Collections.Generic;

namespace AttendanceAPI.Services
{
    public class AttendanceService
    {
        private readonly string _connectionString;

        public AttendanceService(string connectionString)
        {
            _connectionString = connectionString;
        }

        // 出勤データを取得
        public List<Attendance> GetAllAttendances()
        {
            var attendances = new List<Attendance>();
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM attendance", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        attendances.Add(new Attendance
                        {
                            AttendanceDate = reader.GetDateTime("attendance_date"),
                            EmployeeId = reader.GetInt32("employee_id"),
                            DayOfWeek = reader.GetInt32("day_of_week"),
                            StartTime = reader.GetTimeSpan("start_time"),
                            FinishTime = reader.GetTimeSpan("finish_time"),
                            BreakTime = reader.GetTimeSpan("break_time"),
                            OverTime = reader.GetTimeSpan("over_time"),
                            Notes = reader.IsDBNull(reader.GetOrdinal("notes"))
                            ? ""
                            : reader.GetString("notes")
                        });
                    }
                }
            }
            return attendances;
        }

        // ログイン認証用メソッド
        public (string employeeNumber, string password) GetUserCredentials(string employeeNumber)
        {
            string password = null;
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                // SQLクエリで指定された社員番号に対応するパスワードを取得
                var command = new MySqlCommand("SELECT password FROM users WHERE employee_number = @employeeNumber", connection);
                command.Parameters.AddWithValue("@employeeNumber", employeeNumber);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        password = reader.GetString("password"); // パスワードを取得
                    }
                }
            }
            return (employeeNumber, password);
        }
    }
}