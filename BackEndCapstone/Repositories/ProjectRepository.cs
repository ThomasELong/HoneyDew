using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndCapstone.Repositories
{
    public class ProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Project> GetAll()
        {
            var All = _context.Project.Include(p => p.userProfileId)
                                   .OrderByDescending(p => p.createdDate)
                                   .ToList();
            return All;
        }

        public void Add(Project project)
        {
            _context.Add(project);
            _context.SaveChanges();
        }

        public Project GetById(int id)
        {
            return _context.Project
                .FirstOrDefault(p => p.id == id);
        }


        public List<Project> GetByFirebaseUserId(string id)
        {
            return _context.Project.Include(p => p.userProfile)
                .Where(p => p.userProfile.FirebaseUserId == id)
                .OrderBy(p => p.createdDate)
                .ToList();
        }

        public List<Project> GetByUserProfileId(int id)
        {
            return _context.Project
                            .Include(p => p.userProfile)
                            .Where(p => p.userProfileId == id)
                            .OrderByDescending(p => p.createdDate).ToList();
        }

        public void Update(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var project = GetById(id);
            _context.Project.Remove(project);
            _context.SaveChanges();
        }

    }
}
