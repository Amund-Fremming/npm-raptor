using System;

namespace UserEntity;

public class UserService(UserRepository userRepository) : IUserService
{
    public readonly UserRepository _userRepository = userRepository;
}