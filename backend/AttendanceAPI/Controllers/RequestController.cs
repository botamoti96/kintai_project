using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using RequestAPI.Services;

namespace RequestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RequestController : ControllerBase
    {
        private readonly RequestService _requestService;

        public RequestController(RequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet]

        public IActionResult GetRequests()
        {
            var requests = _requestService.GetAllRequests();
            return Ok(requests);
            //新しいもでるを入れる
        }
    }
}