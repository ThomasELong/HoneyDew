using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Repositories
{
    public class RoomRepository
    {
        private readonly ApplicationDbContext _context;

        public RoomRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Room> GetAll()
        {
            return _context.Room
                .Include(r => r.projectId)
                .ToList();
        }

        public Room GetById(int id)
        {
            return _context.Room
                .Include(r => r.projectId)
                .FirstOrDefault(r => r.id == id);
        }

        public Room GetByProject(Project project)
        {
            return _context.Room
                .Include(r => r.projectId)
                .FirstOrDefault(r => r.projectId == project.Id);
        }
        public void Add(Room room)
        {
            _context.Add(room);
            _context.SaveChanges();
        }

        public void Delete(Room room)
        {
            _context.Room.Remove(room);
            _context.SaveChanges();
        }

        public void Update(Room room)
        {
            _context.Entry(room).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
