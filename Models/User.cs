using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime BirthDate { get; set; }

        public byte Sex { get; set; }

        public int RequestCount { get; set; }
    }
}
