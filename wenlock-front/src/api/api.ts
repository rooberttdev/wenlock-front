const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export const registerUser = async (userData: { name: string; email: string; registration_number: string; password: string }) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário');
  }
  return await response.json();
};


export const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`); 
  if (!response.ok) {
    throw new Error('Erro ao buscar usuário');
  }
  return await response.json();
};

export const updateUser = async (userId: string, userData: { name: string; email: string; registration_number: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }
  return await response.json();
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return []; 
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar o usuário');
    }
  } catch (error) {
    console.error('Erro ao deletar o usuário:', error);
    throw error; 
  }
};
