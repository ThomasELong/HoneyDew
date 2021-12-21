﻿using System;
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
        private readonly TaskNoteRepository _taskNoteRepository;

        public TaskController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _taskRepository = new TaskRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _taskNoteRepository = new TaskNoteRepository(context);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
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

        [HttpGet("getbycategoryid/{id}")]
        public IActionResult GetTasksByCategoryId(int id)
        {
            var tasks = _taskRepository.GetTasksByCategoryId(id);
            if (tasks == null) {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpGet("getbyuserprofileid")]
        public IActionResult GetTasksByUserProfileId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var tasks = _taskRepository.GetTasksByUserProfileId(currentUser.Id);
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult Post(Task task)
        {
            _taskRepository.Add(task);
            return CreatedAtAction(nameof(Get), new { Id = task.id }, task);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Task task)
        {

            _taskRepository.Update(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var taskTaskNotes = _taskNoteRepository.GetTaskNotesByTaskId(id);
            taskTaskNotes.ForEach(ttn => _taskNoteRepository.Delete(ttn.id));

            _taskRepository.Delete(id);
            return NoContent();
        }

    }
}
