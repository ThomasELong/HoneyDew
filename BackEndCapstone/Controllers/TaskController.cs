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
    public class TaskController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly TaskRepository _taskRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public TaskController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _taskRepository = new TaskRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_taskRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = _taskRepository.GetById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpGet("getbyprojectid/{id}")]
        public IActionResult GetTasksByProject(int id)
        {
            var task = _taskRepository.GetTasksByProject(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]

        public IActionResult Post(Task task)
        {
            _taskRepository.Add(task);
            return CreatedAtAction(nameof(Get), new { Id = task.id }, task);
        }
       
    }
}
