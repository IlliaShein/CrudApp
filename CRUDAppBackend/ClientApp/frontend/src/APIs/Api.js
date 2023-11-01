import axios from 'axios';

const baseUrl = 'https://localhost:7265/Person';

async function HandleErrors(func) {
  try {
    const response = await func();
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getPersons() {
  return await HandleErrors(() => axios.get(baseUrl));
}

async function createPerson(newPerson) {
  return await HandleErrors(() => axios.post(baseUrl, newPerson));
}

async function removePerson(personId) {
  return await HandleErrors(() => axios.delete(baseUrl + "/" + personId));
}

async function savePersonEditing(person) {
  return await HandleErrors(() => axios.put(baseUrl, person));
}

export { getPersons, createPerson, removePerson, savePersonEditing };
