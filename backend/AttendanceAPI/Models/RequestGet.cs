using System.Runtime.InteropServices;
using AttendanceAPI.Models;
using MySql.Data.MySqlClient;

namespace RequestGetAPI.Models
{
    public class RequestGet
    {
        public int RequestId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string Workplace { get; set; }
        public string Day { get; set; }
        public int DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan FinishTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public TimeSpan OverTime { get; set; }
        public string? Notes { get; set; }
        public int IsApproved { get; set; }
    }
}

