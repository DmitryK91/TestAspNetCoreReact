using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Student
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }

        [Required]
        public byte Sex { get; set; }

        [Required]
        [StringLength(40)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(40)]
        public string LastName { get; set; }

        [StringLength(60)]
        public string Patronymic { get; set; }

        [StringLength(16, MinimumLength = 6)]
        public string UniqID { get; set; }

        // public List<User> StudentUsers { get; set; }
    }
}
