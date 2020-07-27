using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BackEndCapstone.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string firstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string lastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }
    }
}
