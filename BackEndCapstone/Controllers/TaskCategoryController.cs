using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BackEndCapstone.Data;
using BackEndCapstone.Models;
using BackEndCapstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskCategoryController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly TaskRepository _taskRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly TaskCategoryRepository _taskCategoryRepository;

        public TaskCategoryController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _taskRepository = new TaskRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _taskCategoryRepository = new TaskCategoryRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_taskCategoryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = _taskCategoryRepository.GetById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
