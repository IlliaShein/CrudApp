using DbLib.Models.EntityFramework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;

namespace ReactCRUD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public PersonController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IResult> Get()
        {
            var people = await _dbContext.Person.ToListAsync();
            return Results.Ok(people);
        }

        [HttpPost]
        public async Task<IResult> Create([FromBody] Person person)
        {
            return await HandleErrorsInMethod(async () =>
            {
                _dbContext.Person.Add(person);
                await _dbContext.SaveChangesAsync();
            });
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            return await HandleErrorsInMethod(async () =>
            {
                var person = await _dbContext.Person.FindAsync(id);

                if (person == null)
                {
                    throw new InvalidOperationException("Person not found");
                }

                _dbContext.Person.Remove(person);
                await _dbContext.SaveChangesAsync();
            });
        }

        [HttpPut]
        public async Task<IResult> Put([FromBody] Person changedPerson)
        {
            return await HandleErrorsInMethod(async () =>
            {
                var person = await _dbContext.Person.FindAsync(changedPerson.Id);

                if (person == null)
                {
                    throw new InvalidOperationException("Person not found");
                }

                person.FirstName = changedPerson.FirstName;
                person.LastName = changedPerson.LastName;
                person.Age = changedPerson.Age;
                person.Description = changedPerson.Description;

                await _dbContext.SaveChangesAsync();
            });
        }

        private async Task<IResult> HandleErrorsInMethod(Func<Task> databaseOperation)
        {
            try
            {
                await databaseOperation();
                return Results.Ok();
            }
            catch (Exception)
            {
                return Results.StatusCode(500);
            }
        }
    }
}
