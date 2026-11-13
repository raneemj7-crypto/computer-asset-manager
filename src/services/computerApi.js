const API_URL = 'http://localhost:8080/api/v1/computers';

async function checkResponse(response) {
  if (!response.ok) throw new Error(`Server request failed (${response.status})`);
  return response;
}

export async function getComputers(page = 0, size = 100) {
  const response = await checkResponse(await fetch(`${API_URL}?page=${page}&size=${size}`));
  return response.json();
}

export async function getComputerById(id) {
  const response = await checkResponse(await fetch(`${API_URL}/${id}`));
  return response.json();
}

export async function createComputer(computer) {
  await checkResponse(await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...computer, id: null }) }));
}

export async function updateComputer(id, computer) {
  await checkResponse(await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...computer, id: null }) }));
}

export async function deleteComputer(id) {
  await checkResponse(await fetch(`${API_URL}/${id}`, { method: 'DELETE' }));
}
