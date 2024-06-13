import { useMemo } from "react";
import { useGetAssistant } from "../../hooks/useGetAssistant";
import { Message } from "../../hooks/useGetIndividualThread";

interface ThreadMessageProps { 
  message: Message;

}



type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export default function ThreadMessage({message}: ThreadMessageProps) { 
  const { data } = useGetAssistant();
  const assistantName = useMemo(() => { 
    return data?.assistant?.name;
  }, [data]);

  const messageDate = useMemo(() => { 
    const timestamp = 1718168923;
    const date = new Date(timestamp * 1000);

// Format the date to display only the month and year
    const options: DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }, [message.created_at]);

  return (
    <div
      className={`${
        message.role === "user" ? "justify-end" : "justify-start"
      } flex flex-col my-4 w-full`}
    >
      <div
        className="rounded-md flex flex-col w-full border border-gray-300"
      >
        {message.role === "assistant" && (
          <div className="p-2 bg-gray-200 text-gray-900">
            { assistantName}
          </div>
        )}
        <div>
          {message.content.map((content, index) => (
            <div key={index} className="p-2">
              {content.text.value}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-end py-2">
        <div className="text-xs text-gray-500">{messageDate}</div>
      </div>
    </div>
  )
}