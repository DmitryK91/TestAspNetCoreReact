using System;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;

namespace AdminTest.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _userRepository;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUsersRepository userRepository, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("{page}")]
        public async Task<IActionResult> Post(int page, [FromBody]Response response)
        {
            try
            {
                var filters = response.filters != null ? string.Join("\n\t", response.filters.Select(f => $"{f.Field}: {f.Val}")) : null;
                _logger.LogInformation($"\nPage: {page};\nFilters: \n\t{filters}\nOrderBy: {response.orderBy} {response.sortDirection}");

                var res = await _userRepository.GetUsersAsync(page, response);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
