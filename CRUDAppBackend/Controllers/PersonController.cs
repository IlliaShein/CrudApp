using CRUDAppBackend.DB;
using DbLib.Models.EntityFramework;
using Microsoft.AspNetCore.Mvc;
using ReactCRUD.DB;

namespace ReactCRUD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        PersonManager _personManager;

        public PersonController(MyDbContext dbContext)
        {
            _personManager = new PersonManager(dbContext);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var people = await _personManager.GetAllPersons();
            return Ok(people);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            await _personManager.Create(person);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _personManager.Delete(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Person changedPerson)
        {
            await _personManager.ChangePerson(changedPerson);
            return Ok();
        }
    }
}
