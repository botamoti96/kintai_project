using MySql.Data.MySqlClient;
using AttendanceAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace AttendanceAPI.Services 
{
    public class AttendanceService 
    {
        private readonly string _connectionString;
        public AttendanceService(string connectionString) 
        {
            _connectionString = connectionString;
        }

<<<<<<< HEAD
        // 出勤データを取得
=======
        public int GetUserId(string userName)
        {
            int id=0;
            using(var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT employee_id FROM employee WHERE employee_name = @employeeName";
                using(var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.Add(userName);
                    using(var reader = command.ExecuteReader())
                    {
                        id = reader.GetInt16("user_id");
                    }
                }
            }
            Console.WriteLine("id:" +id);
            return id;
        }

        public List<Attendance> GetMonthlyAttendance(int userId, int year, int month) 
        {
            var attendances = new List<Attendance>();
            using (var connection = new MySqlConnection(_connectionString)){
                connection.Open();
                string query = "SELECT attendance_date FROM attendance WHERE user_id = @userId && year = @year && month = @month";
                using(var command = new MySqlCommand(query, connection)){
                    command.Parameters.Add(userId);
                    command.Parameters.Add(year);
                    command.Parameters.Add(month);
                    using(var reader = command.ExecuteReader())
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
            }
            return attendances;
        }

>>>>>>> feature/createBackend
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
                                Notes =  reader.GetString("notes")
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