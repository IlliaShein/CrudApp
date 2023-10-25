using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;

namespace CRUDAppBackend.DB
{
    public class PersonManager
    {
        private readonly MyDbContext _dbContext;

        public PersonManager(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Person>> GetAllPersons()
        {
            var people = await _dbContext.Person.ToListAsync();
            return people;
        }

        public async Task Create(Person person)
        {
            _dbContext.Person.Add(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            if (!(_dbContext.Person.Any(p => p.Id == id)))
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            await _dbContext.Person.Where(p => p.Id == id).ExecuteDeleteAsync();
        }

        public async Task ChangePerson(Person changedPerson)
        {
            if (!(_dbContext.Person.Any(p => p.Id == changedPerson.Id)))
            {
                throw new InvalidOperationException($"Person with id \"{changedPerson.Id}\" not found");
            }

            await _dbContext.Person.Where(p => p.Id == changedPerson.Id)
                .ExecuteUpdateAsync(p => p
                .SetProperty(p => p.FirstName, changedPerson.FirstName)
                .SetProperty(p => p.LastName, changedPerson.LastName)
                .SetProperty(p => p.Age, changedPerson.Age)
                .SetProperty(p => p.Description, changedPerson.Description));
        }
    }
}
