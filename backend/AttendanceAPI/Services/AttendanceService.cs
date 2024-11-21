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
                            Notes = reader.GetString("notes")
                        });
                    }
                }
            }
            return attendances;
        }
    }
}