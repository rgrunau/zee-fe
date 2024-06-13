import { useParams } from "react-router-dom"
import { useSendMessageToThread } from "../hooks/useSendMessageToThread"
import ChatTheadList from "../components/chat/chat-thread";


export default function Chat() { 
  const { id } = useParams()
  const mutatation = useSendMessageToThread()
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const data = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(data.entries());
    console.log('Form Data:', formData);  // Debugging log

    if (!id) {
      console.error('No id');
      return;
    }

    const messageFromUser = {
      message: formData.message as string,
      role: 'user',
    };
    console.log('Message from user:', messageFromUser);  // Debugging log

    mutatation.mutate({ threadId: id, message: messageFromUser });
    console.log('Form submitted');  // Debugging log
  };
  return (
    <section className="flex flex-col h-[85vh]">
      <div className="flex-1 mt-16 mb-16 overflow-y-auto p-4">
        <ChatTheadList />
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            name="message"
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </footer>
    </section>
    )
}