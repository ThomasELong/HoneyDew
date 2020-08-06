using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class Task
    {
        [Required]
        public string taskTitle { get; set; }
        [Required]
        public string taskPriority { get; set; }
        [Required]
        public bool taskComplete { get; set; }
        [Required]
        public int projectId { get; set; }
        public Project project { get; set; }
        [Required]
        public int taskCategoryId { get; set; }
        public TaskCategory taskCategory { get; set; }
        public int id { get; set; }
    }
}
