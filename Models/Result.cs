namespace Models
{
    public class Result
    {
        public int Page { get; set; }
        public int PagesCount { get; set; }
        public object Data { get; set; }

        public Result(object data, int page, int pagesCount)
        {
            Data = data;
            Page = page;
            PagesCount = pagesCount;
        }
    }
}