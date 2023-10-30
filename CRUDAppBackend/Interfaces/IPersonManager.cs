using CRUDAppBackend.DTOs;

namespace CRUDAppBackend.Interfaces
{
    public interface IPersonManager
    {
        Task<List<PersonDTO>> GetAll();
        Task Create(PersonDTO person);
        Task Delete(int id);
        Task ChangePerson(PersonDTO changedPerson);
    }
}
