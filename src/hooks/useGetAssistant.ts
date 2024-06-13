import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../lib/api/make-request";

interface AssistantResponse {
  assistant: Assistant;
}

interface Assistant {
  id: string;
  object: string;
  created_at: number;
  name: string;
  description: string | null;
  model: string;
  instructions: string;
  tools: Tool[];
  metadata: Record<string, any>;
  top_p: number;
  temperature: number;
  response_format: string;
}

interface Tool {
  type: string;
}

const getAssistant = async (): Promise<AssistantResponse> => {
  const url = `http://127.0.0.1:8000/`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await makeRequest<AssistantResponse>(url, options);
};

export const useGetAssistant = (): UseQueryResult<AssistantResponse, Error> => {
  return useQuery<AssistantResponse, Error>({
    queryKey: ['assistant'],
    queryFn: getAssistant,
  });
};