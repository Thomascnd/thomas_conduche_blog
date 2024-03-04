import { useQuery, useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import Loader from "@/web/components/ui/Loader"
import Alert from "@/web/components/ui/Alert"
import Link from "@/web/components/ui/Link"
import InputForm from "@/web/components/ui/InputForm"
import { useSession } from "@/web/components/SessionContext"

const UpdatePost = () => {
  const { session } = useSession()
  const router = useRouter()
  const {
    query: { postId },
  } = router
  const { isFetching: isFetchingPost, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient(`/post/${postId}`),
    enabled: Boolean(postId),
  })
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.patch(`/post/${postId}`, values),
  })
  const handleClickUpdate = async (values) => {
    await mutateAsync(values)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>your post is updated</Alert>
        <p>
          <Link href="/">Go to list post page.</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      {isFetchingPost && session && session.role !== "author" ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center"> Update Post </h1>
          <InputForm
            initialValues={{
              title: post?.title,
              description: post?.description,
            }}
            handleSubmit={handleClickUpdate}
          />
        </>
      )}
    </div>
  )
}

export default UpdatePost
