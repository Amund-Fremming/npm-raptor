using Microsoft.AspNetCore.Mvc;
using UserEntity;
using System;

namespace UserEntity;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserService userService) : ControllerBase
{
    public readonly UserService _userService = userService;
}