import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface ReturnMessageContent { 
  message: string;
  role: string;
}

interface PostToThreadInterface {
  message: MessageContent;
  threadId: string;

}

const postToThread = async ({message, threadId}: PostToThreadInterface): Promise<ReturnMessageContent> => { 
  console.log('Posting new chat:', message, threadId);
  try {
    const response = await fetch(`http://127.0.0.1:8000/messages/${threadId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thread_id: threadId, message }),
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

interface MessageContent {
  message: string;
  role: string;
}

interface SendMessageToThreadHookInterface {
  threadId: string;
  message: MessageContent;
}

export const useSendMessageToThread = (): UseMutationResult<ReturnMessageContent, Error, SendMessageToThreadHookInterface, unknown> => {
  return useMutation<ReturnMessageContent, Error, SendMessageToThreadHookInterface>({
    mutationFn: (variables: SendMessageToThreadHookInterface) => postToThread(variables),
    onSuccess: (data) => {
      console.log('Success', data);
      return data;
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });
};