using Microsoft.AspNetCore.Mvc;
using UserEntity;
using System;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace UserEntity;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    public readonly IUserService _userService = userService;

    [HttpGet]
    public ActionResult<string> Test()
    {
        return "Test success!";
    }
}