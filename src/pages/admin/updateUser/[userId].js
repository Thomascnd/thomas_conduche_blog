import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import SubmitButton from "@/web/components/ui/SubmitButton"
import Alert from "@/web/components/ui/Alert"
import Link from "@/web/components/ui/Link"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Field, Formik } from "formik"
import { useRouter } from "next/router"
import Loader from "@/web/components/ui/Loader"
import { useSession } from "@/web/components/SessionContext"

const EditProfile = () => {
  const { session } = useSession()
  const router = useRouter()
  const {
    query: { userId },
  } = router
  const { isFetching: isFetchingUsers, data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient(`/user/${userId}`),
    enabled: Boolean(userId),
  })
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.patch(`/user/${userId}`, values),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>The profile is updated</Alert>
        <p>
          <Link href="/">Go to list post page.</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      {isFetchingUsers && session && session.role !== "admin" ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Update the profile
          </h1>
          <Formik
            initialValues={{
              username: user?.username,
              email: user?.email,
              role: user?.role,
              isActivate: user?.isActivate,
            }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <FormField name="username" label="Nom d'utilisateur" />
              <FormField name="email" label="Email" />
              <label>
                Role:
                <Field name="role" as="select">
                  <option value="user">User</option>
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </Field>
              </label>
              <label>
                Activated:
                <Field name="isActivate" type="checkbox" />
              </label>
              <SubmitButton>Enregistrer</SubmitButton>
            </Form>
          </Formik>
        </>
      )}
    </div>
  )
}

export default EditProfile
