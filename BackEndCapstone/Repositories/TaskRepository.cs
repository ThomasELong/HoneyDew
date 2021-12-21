using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
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
                .ToList();
        }

        public Task GetById(int id)
        {
            return _context.Task
                .FirstOrDefault(t => t.id == id);
        }
        public List<Task> GetTasksByUserProfileId(int id)
        {
            List<int> projects = _context.Project
                .Where(p => p.userProfileId == id)
                .Select(p => p.id)
                .ToList();
            
            return _context.Task
                .Where(t => projects.Contains(t.projectId))
                .OrderByDescending(t => t.taskPriority).ToList();
        }

        public List<Task> GetTasksByProject(int id)
        {
            return _context.Task
                .Where(t => t.projectId == id)
                .OrderByDescending(t => t.taskPriority)
                .ToList();
        }
        public List<Task> GetTasksByCategoryId(int id)
        {
            return _context.Task
                .Include(t => t.taskCategory)
                .Where(t => t.taskCategoryId == id)
                .ToList();
        }

        public void Add(Task task)
        {
            _context.Add(task);
            _context.SaveChanges();
        }

        public void Update(Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var task = GetById(id);
            _context.Task.Remove(task);
            _context.SaveChanges();
        }

        
    }
}
