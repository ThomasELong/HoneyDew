using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class TaskCategory
    {
        public int id { get; set; }
        [Required]
        public string type { get; set; }
    }
}
