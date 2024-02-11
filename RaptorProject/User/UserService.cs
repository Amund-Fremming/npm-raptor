using System;

namespace UserEntity;

public class UserService(UserRepository userRepository)
{
    public readonly UserRepository _userRepository = userRepository;
}