using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndCapstone.Repositories
{
    public class TaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Task> GetAll()
        {
            return _context.Task
                .Include(t => t.roomId)
                .ToList();
        }

        public Task GetById(int id)
        {
            return _context.Task
                .Include(t => t.roomId)
                .FirstOrDefault(t => t.id == id);
        }
        public void Add(Task task)
        {
            _context.Add(task);
            _context.SaveChanges();
        }

        public void Delete(Task task)
        {

            _context.Task.Remove(task);
            _context.SaveChanges();
        }

        public void Update(Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
