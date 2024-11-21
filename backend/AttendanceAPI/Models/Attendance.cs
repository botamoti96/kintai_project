namespace AttendanceAPI.Models
{
    public class Attendance
    {
        public DateTime AttendanceDate { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan FinishTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public TimeSpan OverTime { get; set; }
        public string? Notes { get; set; }
    }
}