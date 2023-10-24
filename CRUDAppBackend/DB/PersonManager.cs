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
            var person = await _dbContext.Person.SingleOrDefaultAsync(p => p.Id == id);

            if (person == null)
            {
                throw new InvalidOperationException($"Person with id \"{id}\" not found");
            }

            _dbContext.Person.Where(p => p.Id == id).ExecuteDelete();
        }

        public async Task ChangePerson(Person changedPerson)
        {
            var person = await _dbContext.Person.SingleOrDefaultAsync(p => p.Id == changedPerson.Id);

            if (person == null)
            {
                throw new InvalidOperationException($"Person with id \"{changedPerson.Id}\" not found");
            }

            _dbContext.Person.Where(p => p.Id == changedPerson.Id)
                .ExecuteUpdate(p => p
                .SetProperty(p => p.FirstName, changedPerson.FirstName)
                .SetProperty(p => p.LastName, changedPerson.LastName)
                .SetProperty(p => p.Age, changedPerson.Age)
                .SetProperty(p => p.Description, changedPerson.Description));
        }
    }
}
