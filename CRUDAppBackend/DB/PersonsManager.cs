using DbLib.Models.EntityFramework;
using ReactCRUD.DB;

namespace CRUDAppBackend.DB
{
    public static class PersonsManager
    {
        public static List<Person> GetAll(MyDbContext dbContext)
        {
            return dbContext.Person.ToList();
        }

        public static void Add(MyDbContext dbContext, Person person)
        {
            dbContext.Person.Add(person);
            dbContext.SaveChanges();
        }

        public static IResult Delete(MyDbContext dbContext, int personId)
        {
            var person = dbContext.Person.Find(personId);

            if (person == null)
            {
                return Results.NotFound();
            }

            dbContext.Person.Remove(person);
            dbContext.SaveChanges();

            return Results.Ok();
        }

        public static IResult ChangePerson(MyDbContext dbContext, Person changedPerson)
        {
            var person = dbContext.Person.Find(changedPerson.Id);

            if (changedPerson == null)
            {
                return Results.NotFound();
            }

            person.FirstName = changedPerson.FirstName;
            person.LastName = changedPerson.LastName;
            person.Age = changedPerson.Age;
            person.Description = changedPerson.Description;

            dbContext.SaveChanges();

            return Results.Ok();
        }
    }
}
