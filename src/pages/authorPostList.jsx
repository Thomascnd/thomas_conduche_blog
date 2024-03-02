import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/ui/Loader"
import Button from "@/web/components/ui/Button"
import router from "next/router"
import { useSession } from "@/web/components/SessionContext"

const PostListPage = () => {
  const { session } = useSession()
  const {isFetching: isFetchingPost, data: post,} = useQuery({
    queryKey: ["authorPosts"],
    queryFn: () => apiClient(`/authorPosts`),
  })
  const handleClickUpdate =  (id) => () => {
    router.push(`/updatePost/${id}`)
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {isFetchingPost && session && session.role !== "author" ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center"> Directory of Your Publications</h1>
          <table className="table-auto text-lg mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2"> Number of posts: {post?.length} </th>
                <th className="px-4 py-2"> Author</th>
                <th className="px-4 py-2"> Date</th>
                <th className="px-4 py-2"> Views</th>
                <th className="px-4 py-2"> Update</th>
              </tr>
            </thead>
            <tbody>
               {post?.map((postItem)=>(
                <tr key={postItem.id}>
                  <td className="border px-4 py-2"> {postItem.title} </td>
                  <td className="border px-4 py-2"> {postItem.username} </td>
                  <td className="border px-4 py-2"> {new Date(postItem.createdAt).toLocaleDateString()} </td>
                  <td className="border px-4 py-2"> {postItem.views} </td>
                  <td className="border px-4 py-2">
                    <Button onClick={handleClickUpdate(postItem.id)}>Update</Button>
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


export default PostListPage