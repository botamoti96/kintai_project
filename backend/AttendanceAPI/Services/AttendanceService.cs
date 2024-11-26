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
                    using(var reader = command.)
                    {
                        
                    }
                }
                
                
            }
        }

        public List<Attendance> GetAllAttendances(string year, string month)
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
                            Notes = reader.GetString("notes")
                        });
                    }
                }
            }
            return attendances;
        }

        
    }
}