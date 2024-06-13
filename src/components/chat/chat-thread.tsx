import { useGetIndividualThread } from "../../hooks/useGetIndividualThread"

export default function ChatTheadList() { 
  const {data, isLoading} = useGetIndividualThread()
  console.log('Data:', data);  // Debugging log
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && (
        <div className="w-full flex flex-col">
          {data.map((message: any) => (
            <div
              key={message.id}
              className={`${
                message.role === "user" ? "justify-end" : "justify-start"
              } flex`}
            >
              <div
                className={`${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } p-2 rounded-md`}
              >
                {message.id}
              </div>
            </div>
          ))}
        </div>
      )}
      </>
    )
}