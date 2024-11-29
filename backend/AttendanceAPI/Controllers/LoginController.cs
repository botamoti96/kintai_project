using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; // MySQLの接続に必要
using BCrypt.Net;
using ZstdSharp.Unsafe;
using AttendanceAPI.Services;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using LoginAPI.Services; // パスワードのハッシュ化に必要

namespace YourNamespace
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService){
            _loginService = loginService;
        }

        // ログイン用のPOSTメソッド
        [HttpPost]
        [Route("test")]
        public IActionResult PostLoginInfo([FromBody] LoginRequest loginRequest){
            string result = _loginService.Login(loginRequest);
            return Ok();
        }
    }
}