using Microsoft.AspNetCore.Razor.TagHelpers;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;

using RequestGetAPI.Models;
using System.Collections.Generic;

namespace RequestGetAPI.Services
{

    public class RequestGetService
    {
        private readonly string _connectionString;//フィールド

        public RequestGetService(string connectionString)//コンストラクタ
        {
            _connectionString = connectionString;
        }


        //申請一覧をもらうメソッド
        // public List<Models.Request> GetAllRequests()//コントローラー側で使われる
        // {
        //     var requests = new List<Models.Request>();//Requestをいれるリストを定義
        //     using (var connection = new MySqlConnection(_connectionString))
        //     {
        //         connection.Open();
        //         var command = new MySqlCommand("SELECT * FROM request", connection);
        //         using (var reader = command.ExecuteReader())
        //         {
        //             while (reader.Read())//データペースの最後の行まで終わったら終了
        //             {
        //                 requests.Add(new Models.Request
        //                 {
        //                     RequestId = reader.GetInt32("request_id"),
        //                     AttendanceId = reader.GetInt32("attendance_id"),
        //                     EmployeeId = reader.GetInt32("employee_id"),
        //                     RequestDate = reader.GetDateTime("request_date"),
        //                     Year = reader.GetString("year"),
        //                     Month = reader.GetString("month"),
        //                     Day = reader.GetString("day"),
        //                     DayOfWeek = reader.GetInt32("day_of_week"),
        //                     StartTime = reader.GetTimeSpan("start_time"),
        //                     FinishTime = reader.GetTimeSpan("finish_time"),
        //                     BreakTime = reader.GetTimeSpan("break_time"),
        //                     OverTime = reader.GetTimeSpan("over_time"),
        //                     Notes = reader.IsDBNull(reader.GetOrdinal("notes"))
        //                     ? ""
        //                     : reader.GetString("notes"),
        //                     IsApproved = reader.GetInt32("is_approved"),
        //                     ApprovedDate = reader.IsDBNull(reader.GetOrdinal("approved_date"))
        //                     ? new DateTime(2024, 1, 1)
        //                     : reader.GetDateTime("approved_date")
        //                 });
        //             }
        //         }
        //     }
        //     return requests;
        // }


        //この階層にほかの欲しいメソッドを定義する感じ？


        // 情報を取得
        public List<Models.RequestGet> GetRequests(int userId, int year, int month)
        {
            var requests = new List<Models.RequestGet>();
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT employee.employee_id, employee.employee_name, employee.department, employee.workplace, request.day, request.day_of_week, request.start_time, request.finish_time, request.break_time, request.over_time, request.is_approved FROM kintai.employee INNER JOIN kintai.request ON employee.employee_id = request.employee_id WHERE employee.employee_id = @userId AND request.year = @year AND request.month = @month";
                using (var command = new MySqlCommand(query, connection))
                {
                    //Pavameters.でSQLインジェクション防止のためにパラメーターを使用して値をバインドする(結びつけること)
                    command.Parameters.AddWithValue("@userId", userId);//(SQL文内で使用されるパラメーター名, 実際に渡す値)
                    command.Parameters.AddWithValue("@year", year);
                    command.Parameters.AddWithValue("@month", month);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            requests.Add(new RequestGet
                            {
                                RequestId = reader.GetInt32("request_id"),
                                EmployeeId = reader.GetInt32("employee_id"),
                                EmployeeName = reader.GetString("employee_name"),
                                Department = reader.GetString("department"),
                                Workplace = reader.GetString("workplace"),
                                Day = reader.GetString("day"),
                                DayOfWeek = reader.GetInt32("day_of_week"),
                                StartTime = reader.GetTimeSpan("start_time"),
                                FinishTime = reader.GetTimeSpan("finish_time"),
                                BreakTime = reader.GetTimeSpan("break_time"),
                                OverTime = reader.GetTimeSpan("over_time"),
                                Notes = reader.GetString("notes"),
                                IsApproved = reader.GetInt32("is_approved")
                            });
                        }
                    }
                }
            }
            return requests;
        }

    }
}
