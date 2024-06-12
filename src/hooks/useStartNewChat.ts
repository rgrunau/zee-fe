import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface NewChatResponse {
  id: string;
}

const postNewChat = async (): Promise<NewChatResponse> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/assistant/create-thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error posting new chat:', error);
    throw error; // Re-throw the error to be handled by useMutation's onError
  }
};

export const useStartNewChat = (): UseMutationResult<NewChatResponse, Error, void, unknown> => {
  const navigate = useNavigate();

  return useMutation<NewChatResponse, Error, void>({
    mutationFn: postNewChat,
    onSuccess: (data) => {
      console.log('Success');
      navigate(`/chat/${data.id}`); // Use the id from the response for the redirect
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });
};