using Microsoft.AspNetCore.Mvc;
using UserEntity;
using System;

namespace UserEntity;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    public readonly IUserService _userService = userService;
}