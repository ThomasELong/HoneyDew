using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BackEndCapstone.Data;
using BackEndCapstone.Models;
using BackEndCapstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndCapstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly TaskRepository _taskRepository;

        public ProjectController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _taskRepository = new TaskRepository(context);
        }

        //getting the authorized user's 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectRepository.GetById(id);

            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }


        [HttpPost]
        public IActionResult Post(Project project)
        {
            _projectRepository.Add(project);
            return CreatedAtAction(nameof(Get), new { Id = project.id }, project);
        }




        [HttpGet("getbyuser")]
        public IActionResult GetProjectByUser()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_projectRepository.GetByUserProfileId(currentUser.Id));
        }



        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUserProfile();
            project.userProfileId = currentUser.Id;

            _projectRepository.Update(project);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var projectTasks = _taskRepository.GetTasksByProject(id);
            projectTasks.ForEach(pt => _taskRepository.Delete(pt));

            _projectRepository.Delete(id);
            return NoContent();
        }


    }
}
