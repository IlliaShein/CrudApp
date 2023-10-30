import axios from 'axios';

const baseUrl = 'https://localhost:7265/Person';

async function HandleErrors(func) {
  try {
    const response = await func();
    return response;
  } catch (error) {
    throw error;
  }
}

async function getPersons() {
  return await HandleErrors(async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  });
}

async function createPerson(newPerson) {
  return await HandleErrors(async () => {
    const response = await axios.post(baseUrl, newPerson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  });
}

async function removePerson(personId) {
  return await HandleErrors(async () => {
    const response = await axios.delete(baseUrl + "/" + personId);
    return response.data;
  });
}

async function savePersonEditing(person) {
  return await HandleErrors(async () => {
    const response = await axios.put(baseUrl, person);
    return response.data;
  });
}

export { getPersons, createPerson, removePerson, savePersonEditing };
