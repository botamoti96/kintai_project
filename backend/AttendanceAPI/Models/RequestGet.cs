using System.Runtime.InteropServices;
using AttendanceAPI.Models;
using MySql.Data.MySqlClient;

namespace RequestGetAPI.Models
{
    public class RequestGet
    {
        public int EmployeeId { get; set; }
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
    }
}

