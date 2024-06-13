import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../lib/api/make-request";
import { useParams } from "react-router-dom";

interface TextContent {
  annotations: any[];  // You can specify a more specific type if known
  value: string;
}

interface Content {
  text: TextContent;
  type: string;
}

interface Message {
  id: string;
  assistant_id: string;
  attachments: any[];  // You can specify a more specific type if known
  completed_at: number | null;
  content: Content[];
  created_at: number;
  incomplete_at: number | null;
  incomplete_details: any | null;  // You can specify a more specific type if known
  metadata: Record<string, any>;  // You can specify a more specific type if known
  object: string;
  role: string;
  run_id: string;
  status: string | null;
  thread_id: string;
}

interface Messages {
  messages: Message[];  // Ensure this matches the structure of the API response
}

const getIndividualThread = async (threadId: string): Promise<Messages[]> => { 
  const url = `http://127.0.0.1:8000/messages/${threadId}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await makeRequest<Messages[]>(url, options);
};

export const useGetIndividualThread = () => {
  const { id } = useParams();
  const threadId = id as string;
  return useQuery<Messages[], Error>({
    queryKey: ['individual-thread', threadId],
    queryFn: () => getIndividualThread(threadId),
    enabled: !!threadId,  // Ensure the query only runs if threadId is available
  });
};