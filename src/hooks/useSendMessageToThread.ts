import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { makeRequest } from "../lib/api/make-request";
interface ReturnMessageContent { 
  message: string;
  role: string;
}

interface PostToThreadInterface {
  message: MessageContent;
  threadId: string;

}

const postToThread = async ({message, threadId}: PostToThreadInterface): Promise<ReturnMessageContent> => { 
  const url = `http://127.0.0.1:8000/messages/${threadId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({thread_id: threadId, message: message}),
  };
  return await makeRequest<ReturnMessageContent>(url, options);
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