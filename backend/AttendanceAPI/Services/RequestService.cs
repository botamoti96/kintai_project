using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;
using RequestAPI.Models;
using System.Collections.Generic;

namespace RequestAPI.Services
{

    public class RequestService
    {
        private readonly string _connectionString;//フィールド

        public RequestService(string connectionString)//コンストラクタ
        {
            _connectionString = connectionString;
        }


        //申請一覧をもらうメソッド
        public List<Models.Request> GetAllRequests()//コントローラー側で使われる
        {
            var requests = new List<Models.Request>();//Requestをいれるリストを定義
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM request", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())//データペースの最後の行まで終わったら終了
                    {
                        requests.Add(new Models.Request
                        {
                            RequestId = reader.GetInt32("request_id"),
                            AttendanceId = reader.GetInt32("attendance_id"),
                            EmployeeId = reader.GetInt32("employee_id"),
                            RequestDate = reader.GetDateTime("request_date"),
                            Year = reader.GetString("year"),
                            Month = reader.GetString("month"),
                            Day = reader.GetString("day"),
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


        //この階層にほかの欲しいメソッドを定義する感じ？

        public List<Models.Request> GetSelectRequests()
        {
            var requests = new List<Models.Request>();//Requestをいれるリストを定義
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var command = new MySqlCommand("SELECT * FROM request", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())//データペースの最後の行まで終わったら終了
                    {
                        requests.Add(new Models.Request
                        {
                            RequestId = reader.GetInt32("request_id"),
                            AttendanceId = reader.GetInt32("attendance_id"),
                            EmployeeId = reader.GetInt32("employee_id"),
                            RequestDate = reader.GetDateTime("request_date"),
                            Year = reader.GetString("year"),
                            Month = reader.GetString("month"),
                            Day = reader.GetString("day"),
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