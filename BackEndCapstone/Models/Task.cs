using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class Task
    {
        public int id { get; set; }
        [Required]
        public int roomId { get; set; }
        public Room room { get; set; }
        [Required]
        public string taskTitle { get; set; }
        [Required]
        public int taskPriority { get; set; }
        [Required]
        public bool taskComplete { get; set; }
        [Required]
        public int taskCategoryId { get; set; }
        public TaskCategory taskCategory { get; set; }
    }
}
