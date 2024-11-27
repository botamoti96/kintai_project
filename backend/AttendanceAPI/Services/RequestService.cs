using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;
using RequestAPI.Models;
using System.Collections.Generic;

namespace RequestAPI.Services
{

    public class RequestService
    {
        private readonly string _connectionString;

        public RequestService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Models.Request> GetAllRequests()
        {
            var requests = new List<Models.Request>();
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM request", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        requests.Add(new Models.Request
                        {
                            RequestId = reader.GetInt32("request_id"),
                            AttendanceDate = reader.GetDateTime("attendance_date"),
                            EmployeeId = reader.GetInt32("employee_id"),
                            RequestDate = reader.GetDateTime("request_date"),
                            DayOfWeek = reader.GetInt32("day_of_week"),
                            StartTime = reader.GetTimeSpan("start_time"),
                            FinishTime = reader.GetTimeSpan("finish_time"),
                            BreakTime = reader.GetTimeSpan("break_time"),
                            OverTime = reader.GetTimeSpan("over_time"),
                            Notes = reader.IsDBNull(reader.GetOrdinal("notes"))
                            ? ""
                            : reader.GetString("notes"),
                            IsApproved = reader.GetInt32("is_approved"),
                            ApprovedDate = reader.IsDBNull(reader.GetOrdinal("approved_date"))
                            ? new DateTime(2024, 1, 1)
                            : reader.GetDateTime("approved_date")
                        });
                    }
                }
            }
            return requests;
        }

    }
}