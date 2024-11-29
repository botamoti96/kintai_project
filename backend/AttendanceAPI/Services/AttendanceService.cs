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

        // ユーザーIDを取得
        public int GetUserId(string userName)
        {
            int id = 0;
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT employee_id FROM employee WHERE employee_name = @name";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@name", userName);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            id = reader.GetInt32("employee_id");
                        }
                    }
                }
            }
            return id;
        }

        // 月間勤怠情報を取得
        public List<Attendance> GetMonthlyAttendance(int userId, int year, int month)
        {
            var attendances = new List<Attendance>();
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT day, day_of_week, start_time, finish_time, break_time, over_time, notes FROM attendance WHERE employee_id = @userId && year = @year && month = @month";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@userId", userId);
                    command.Parameters.AddWithValue("@year", year);
                    command.Parameters.AddWithValue("@month", month);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            attendances.Add(new Attendance
                            {
                                Day = reader.GetString("day"),
                                DayOfWeek = reader.GetInt32("day_of_week"),
                                StartTime = reader.GetTimeSpan("start_time"),
                                FinishTime = reader.GetTimeSpan("finish_time"),
                                BreakTime = reader.GetTimeSpan("break_time"),
                                OverTime = reader.GetTimeSpan("over_time"),
                                Notes = reader.GetString("notes")
                            });
                        }
                    }
                }
            }
            return attendances;
        }

        // すべての勤怠情報を取得
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
                            AttendanceId = reader.GetInt32("attendance_id"),
                            Year = reader.GetString("year"),
                            Month = reader.GetString("month"),
                            Day = reader.GetString("day"),
                            EmployeeId = reader.GetInt32("employee_id"),
                            DayOfWeek = reader.GetInt32("day_of_week"),
                            StartTime = reader.GetTimeSpan("start_time"),
                            FinishTime = reader.GetTimeSpan("finish_time"),
                            BreakTime = reader.GetTimeSpan("break_time"),
                            OverTime = reader.GetTimeSpan("over_time"),
                            Notes = reader.GetString("notes")
                        });
                    }
                }
            }
            return attendances;
        }

        // ログイン認証用メソッド
        public (string employeeNumber, string password) GetUserCredentials(string employeeNumber)
        {
            string password = "";
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

            // パスワードがnullの場合、例外をスロー
            if (password == null)
            {
                throw new Exception("Password not found for the given employee number.");
            }

            return (employeeNumber, password); // 必ずパスワードを返す
        }
    }
}