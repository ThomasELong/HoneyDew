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
            var All = _context.Room.OrderBy(r => r.name).ToList();
            return All;
        }

        public Room GetById(int id)
        {
            return _context.Room
                .FirstOrDefault(r => r.id == id);
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
