using System.Collections.Generic;

namespace Models
{
    public class Response
    {
        public int visibleCount { get; set; }
        public string orderBy { get; set; }
        public sort? sortDirection { get; set; }
        public List<(string Field, string Val)> filters { get; set; }
    }

    public enum sort
    {
        DESC = -1,
        ASC = 1
    }
}