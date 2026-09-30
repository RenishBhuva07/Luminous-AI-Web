export const sendMessage = async (message: string) => {
  const response = await fetch('http://localhost:3000/api/v1/chats/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
