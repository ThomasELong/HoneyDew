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
    public class RoomController : ControllerBase
    {
        private readonly RoomRepository _roomRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly ProjectRepository _projectRepository;

        public RoomController(ApplicationDbContext context)
        {
            _roomRepository = new RoomRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _projectRepository = new ProjectRepository(context);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_roomRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var room = _roomRepository.GetById(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpGet("getbyuser")]
        public IActionResult GetRoomByProject(Project project)
        {
            return Ok(_roomRepository.GetByProject(project));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Room room)
        {
            _roomRepository.Delete(room);
            return NoContent();
        }
    }
}
