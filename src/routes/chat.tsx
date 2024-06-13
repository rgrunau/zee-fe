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
      <>
        <div>
          <ChatTheadList />
        </div>
        <form onSubmit={handleSubmit}>
          <input name="message" type="text" />
          <button type="submit">Send</button>
        </form>
      </>
    )
}