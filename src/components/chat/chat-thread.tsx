import { useGetIndividualThread } from "../../hooks/useGetIndividualThread"

export default function ChatTheadList() { 
  const {data, isLoading, isError} = useGetIndividualThread()
  console.log('Data:', data);  // Debugging log
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div>
          <h1>Chat</h1>
        </div>
      )}
      </>
    )
}