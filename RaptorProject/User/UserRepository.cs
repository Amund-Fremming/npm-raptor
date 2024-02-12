using System;
using Data;

namespace UserEntity;

public class UserRepository(AppDbContext context)
{
    public readonly AppDbContext _context = context;
}