import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Button from "@/web/components/ui/Button"
import Loader from "@/web/components/ui/Loader"
import router from "next/router"
const IndexPage = () => {
  const { isFetching: isFetchingPost, data: post } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient("/posts"),
  })
  const handleClickView = (id) => () => {
    router.push(`/viewPost/${id}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {isFetchingPost ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            List of publications
          </h1>
          <table className="table-auto text-lg mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2"> Title </th>
                <th className="px-4 py-2"> Author </th>
                <th className="px-4 py-2"> Publication date </th>
              </tr>
            </thead>
            <tbody>
              {post?.map((postItem) => (
                <tr key={postItem.id}>
                  <td className="border px-4 py-2"> {postItem.title} </td>
                  <td className="border px-4 py-2"> {postItem.username} </td>
                  <td className="border px-4 py-2">
                    {new Date(postItem.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <Button onClick={handleClickView(postItem.id)}>view</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default IndexPage
