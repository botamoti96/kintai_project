using System.Runtime.InteropServices;
using AttendanceAPI.Models;
using MySql.Data.MySqlClient;

namespace RequestAPI.Models
{
    public class Request
    {
        public int RequestId { get; set; }
        public int AttendanceId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime RequestDate { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public string Day { get; set; }
        public int DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan FinishTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public TimeSpan OverTime { get; set; }
        public string? Notes { get; set; }
        public int IsApproved { get; set; }
        public DateTime ApprovedDate { get; set; }
    }
}

