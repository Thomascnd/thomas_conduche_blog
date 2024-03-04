import InputForm from "@/web/components/ui/InputForm"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import Alert from "@/web/components/ui/Alert"
import Link from "@/web/components/ui/Link"
import { useSession } from "@/web/components/SessionContext"
import Loader from "@/web/components/ui/Loader"

const initialValues = {
  title: "",
  description: "",
}
const CreatePost = () => {
  const { session } = useSession()
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/posts", values),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>your post has been added</Alert>
        <p>
          <Link href="/">Go to list post page.</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      {session && session.role !== "author" ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center"> Create Post</h1>
          <InputForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  )
}

export default CreatePost
