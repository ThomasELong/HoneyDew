using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class TaskNote
    {
        public int id { get; set; }
        [Required]
        public string title { get; set; }
        [Required]
        public string content { get; set; }
        [Required]
        public DateTime timestamp { get; set; }
        [Required]
        public int taskId { get; set; }
        public Task task { get; set; }
    }
}
