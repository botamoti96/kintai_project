using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using RequestAPI.Services;

namespace RequestAPI.Controllers
{
    [ApiController]//Web Apiコントローラーであることを明示するアノテーション
    [Route("api/[controller]")]//エンドポイント(ここに向けてPOSTやGETをする)

    public class RequestController : ControllerBase//ContorollerBaseは基本クラス
    {
        private readonly RequestService _requestService;

        public RequestController(RequestService requestService)//コンストラクタ
        {
            _requestService = requestService;
        }
        //申請一覧を得るためのエンドポイント？
        [HttpGet]

        public IActionResult GetRequests()
        {
            var requests = _requestService.GetAllRequests();
            return Ok(requests);
            //新しいもでるを入れる
        }
    }
}