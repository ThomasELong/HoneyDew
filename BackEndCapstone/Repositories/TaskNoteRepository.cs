using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Repositories
{
    public class TaskNoteRepository
    {
        private readonly ApplicationDbContext _context;



        public TaskNoteRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<TaskNote> GetAll()
        {
            var All = _context.TaskNote.OrderBy(tn => tn.timestamp).ToList();
            return All;
        }
        public TaskNote GetById(int id)
        {
            return _context.TaskNote.FirstOrDefault(tn => tn.id == id);
        }

        public void Add(TaskNote tasknote)
        {
            _context.Add(tasknote);
            _context.SaveChanges();
        }

        public void Update(TaskNote tasknote)
        {
            _context.Entry(tasknote).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var tn = GetById(id);
            _context.TaskNote.Remove(tn);
            _context.SaveChanges();
        }

    }
}
