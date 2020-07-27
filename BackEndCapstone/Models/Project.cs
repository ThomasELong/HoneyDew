using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string projectNote { get; set; }

        [Required]
        public DateTime timestamp { get; set; }

        [Required]
        public int userProfileId { get; set; }

        [Required]
        public UserProfile userProfile { get; set; }
    }
}
