using System.Security.Claims;
using BackEndCapstone.Data;
using BackEndCapstone.Models;
using BackEndCapstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEndCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskNoteController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly TaskRepository _taskRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly TaskNoteRepository _taskNoteRepository;

        public TaskNoteController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _taskRepository = new TaskRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _taskNoteRepository = new TaskNoteRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_taskNoteRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = _taskNoteRepository.GetById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpGet("getbytaskid/{id}")]
        public IActionResult GetTaskNotesByTask(int id)
        {
            var tasknote = _taskNoteRepository.GetTaskNotesByTaskId(id);
            if (tasknote == null)
                {
                return NotFound();
            }
            return Ok(tasknote);
        }

    }
}
