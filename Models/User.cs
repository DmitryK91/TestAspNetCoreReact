using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        [MinLength(3)]
        public string Login { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        public List<Student> UserStudents { get; set; }
    }
}