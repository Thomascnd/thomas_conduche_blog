/* eslint-disable max-lines-per-function */
import { useRouter } from "next/router"
import Loader from "@/web/components/ui/Loader"
import { useQuery, useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import InputForm from "@/web/components/ui/InputForm"
import { useSession } from "@/web/components/SessionContext"

const initialValues = {
  title: "",
  description: "",
}
const Post = () => {
  const router = useRouter()
  const { session } = useSession()
  const {
    query: { postId },
  } = router
  const { isFetching: isFetchingPost, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient(`/post/${postId}`),
    enabled: Boolean(postId),
  })
  const { isFetching: isFetchingComments, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => apiClient(`/comments/${postId}`),
    enabled: Boolean(postId),
  })
  const { mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post(`/comments/${postId}`, values),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
    router.reload()
  }

  return (
    <div>
      {isFetchingPost && isFetchingComments ? (
        <Loader />
      ) : (
        post && (
          <div className="max-w-2xl px-8 py-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
              {post.title}
            </h1>
            <p className="text-lg mb-4 text-gray-700">Par {post.username}</p>
            <p className="text-lg mb-4 text-gray-600">{post.description}</p>
            <p className="text-sm mb-4 text-gray-500">
              Dernière mise à jour :
              {new Date(post.updatedAt).toLocaleDateString()}
            </p>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Comments
            </h2>
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="mb-4 p-2 border border-gray-200 rounded"
              >
                <h3 className="text-xl font-bold text-blue-600">
                  {comment.title}
                </h3>
                <p className="text-lg text-gray-700">{comment.description}</p>
                <p className="text-sm text-gray-500">Par {comment.username}</p>
              </div>
            ))}
            {session && (
              <InputForm
                initialValues={initialValues}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        )
      )}
    </div>
  )
}

export default Post
