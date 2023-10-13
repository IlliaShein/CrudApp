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
        private readonly ILogger<PersonController> _logger;
        private readonly MyDbContext dbContext;

        public PersonController(ILogger<PersonController> logger,MyDbContext dbContext)
        {
            _logger = logger;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(PersonsManager.GetAll(dbContext));
        }

        [HttpPost]
        public IResult Create([FromBody] Person person)
        {
            try
            {
                PersonsManager.Add(dbContext, person);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Results.StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IResult Delete(int id)
        {
            try
            {
                var result = PersonsManager.Delete(dbContext, id);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Results.StatusCode(500);
            }
        }

        [HttpPut]
        public IResult Put([FromBody] Person changedPerson)
        {
            try
            {
                var result = PersonsManager.ChangePerson(dbContext, changedPerson);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Results.StatusCode(500);
            }
        }
    }
}
