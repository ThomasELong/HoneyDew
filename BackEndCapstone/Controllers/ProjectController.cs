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
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public ProjectController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        //getting the authorized user's 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Project project)
        {
            var currentUser = GetCurrentUserProfile();
            project.userProfileId = currentUser.Id;

            _projectRepository.Add(project);
            return CreatedAtAction("Get", new { id = project.Id }, project);
        }
        [Authorize]
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

        [HttpGet("getbyuser")]
        public IActionResult GetProjectByUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_projectRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.Id)
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
            _projectRepository.Delete(id);
            return NoContent();
        }
    }
}
