using Microsoft.AspNetCore.Mvc;
using AttendanceAPI.Services;

namespace AttendanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;

        public AttendanceController(AttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        public IActionResult GetAttendances()
        {
            var attendances = _attendanceService.GetAllAttendances();
            return Ok(attendances);
        }
    }
}
