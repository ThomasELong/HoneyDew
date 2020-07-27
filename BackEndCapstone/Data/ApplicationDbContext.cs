using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndCapstone.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<TaskCategory> TaskCategory { get; set; }
        public DbSet<TaskNote> TaskNote { get; set; }

    }
}
