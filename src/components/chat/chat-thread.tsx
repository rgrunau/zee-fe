import { useGetIndividualThread } from '../../hooks/useGetIndividualThread';
import ThreadMessage from './thread-message';

const ChatThreadList = () => {
  const { data, error, isLoading } = useGetIndividualThread();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex-1 overflow-y-auto`">
      {data?.map((msg) => (
        <ThreadMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default ChatThreadList;