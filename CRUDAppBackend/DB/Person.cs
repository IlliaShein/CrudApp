namespace ReactCRUD.DB
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string? Description { get; set; }

        public Person(int id, string firstName, string lastName, int age, string? description)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            Description = description;
        }
    }
}
