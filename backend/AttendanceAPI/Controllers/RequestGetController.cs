using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using RequestGetAPI.Services;

namespace RequestGetAPI.Controllers
{
    [ApiController]//Web Apiコントローラーであることを明示するアノテーション
    [Route("api/requestGet")]//エンドポイント(ここに向けてPOSTやGETをする)

    public class RequestController : ControllerBase//ContorollerBaseは基本クラス
    {
        private readonly RequestGetService _requestGetService;

        public RequestController(RequestGetService requestGetService)//コンストラクタ
        {
            _requestGetService = requestGetService;
        }
        //申請一覧を得るためのエンドポイント？
        [HttpGet]
        [Route("list")]//"api/requestGet/list"を指定するとこの動作が行われそう
        public IActionResult GetRequests(int userId, int year, int month)
        {
            var requests = _requestGetService.GetRequests(userId, year, month);
            return Ok(requests);
        }
    }
}