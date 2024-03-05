import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import SubmitButton from "@/web/components/ui/SubmitButton"
import Loader from "@/web/components/ui/Loader"
import Alert from "@/web/components/ui/Alert"
import Link from "@/web/components/ui/Link"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

const EditProfile = () => {
  const { isFetching: isFetchingUser, data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient("/profile"),
  })
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.patch("/profile", values),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>your profile is updated</Alert>
        <p>
          <Link href="/">Go to list post page.</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      {isFetchingUser ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Update Profil</h1>
          <Formik
            initialValues={{
              username: user.username,
              email: user.email,
            }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <FormField
                name="username"
                label="Username"
                type="text"
                placeholder="Enter a username"
              />
              <FormField
                name="email"
                label="Email"
                type="text"
                placeholder="Enter a email"
              />
              <SubmitButton>Save</SubmitButton>
            </Form>
          </Formik>
        </>
      )}
    </div>
  )
}

export default EditProfile
