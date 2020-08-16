using System;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;

namespace AdminTest.Controllers
{
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly IStudentsRepository _studentRepository;
        private readonly ILogger<StudentsController> _logger;

        public StudentsController(IStudentsRepository studentRepository, ILogger<StudentsController> logger)
        {
            _studentRepository = studentRepository;
            _logger = logger;
        }

        [HttpPost("{page}")]
        public async Task<IActionResult> Get(int page, [FromBody] Response response)
        {
            try
            {
                var res = await _studentRepository.GetAsync(page, response);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Student student)
        {
            try
            {
                var res = await _studentRepository.AddAsync(student);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Student student)
        {
            try
            {
                var res = await _studentRepository.EditAsync(student);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{studentID}")]
        public async Task<IActionResult> Delete(Guid studentID)
        {
            try
            {
                var res = await _studentRepository.DeleteAsync(studentID);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
