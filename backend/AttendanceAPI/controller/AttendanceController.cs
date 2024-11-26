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
    }
}
