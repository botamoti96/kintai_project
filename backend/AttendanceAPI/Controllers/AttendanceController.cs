using Microsoft.AspNetCore.Mvc;
using AttendanceAPI.Services;

namespace AttendanceAPI.Controllers {
    [ApiController]
    [Route("api/attendance")]
    public class AttendanceController : ControllerBase {
        private readonly AttendanceService _attendanceService;

        public AttendanceController(AttendanceService attendanceService) {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        [Route("test")]
        public IActionResult GetAttendances() {
            var attendances = _attendanceService.GetAllAttendances();
            return Ok(attendances);
        }


        [HttpGet]
        [Route("monthly")]
        public IActionResult GetMonthlyAttendances(string userName, int year, int month){
            var userId = _attendanceService.GetUserId(userName);
            var attendances = _attendanceService.GetMonthlyAttendance(userId, year, month);
            return Ok(attendances);
        }
    }
}
