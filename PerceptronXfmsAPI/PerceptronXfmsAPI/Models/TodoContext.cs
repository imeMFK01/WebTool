using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using PerceptronXfmsAPI.Models;

namespace PerceptronXfmsAPI.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; } = null!;
    }
}


