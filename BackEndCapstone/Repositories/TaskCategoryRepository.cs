using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Repositories
{
    public class TaskCategoryRepository
    {
        private readonly ApplicationDbContext _context;



        public TaskCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<TaskCategory> GetAll()
        {
            var All = _context.TaskCategory.OrderBy(tc => tc.type).ToList();
            return All;
        }

        public void Add(TaskCategory taskcategory)
        {
            _context.Add(taskcategory);
            _context.SaveChanges();
        }

        public void Update(TaskCategory taskcategory)
        {
            _context.Entry(taskcategory).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var tc = GetById(id);
            _context.TaskCategory.Remove(tc);
            _context.SaveChanges();
        }

        public TaskCategory GetById(int id)
        {
            return _context.TaskCategory.FirstOrDefault(tc => tc.id == id);
        }

    }
}
