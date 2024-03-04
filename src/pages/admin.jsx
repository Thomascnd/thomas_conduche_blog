/* eslint-disable max-lines-per-function */
import Button from "@/web/components/ui/Button"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/ui/Loader"
import router from "next/router"
import { useSession } from "@/web/components/SessionContext"

const AdminPage = () => {
  const { session } = useSession()
  const {
    isFetching: isFetchingUsers,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient("/users"),
  })
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: (id) => apiClient.delete(`/user/${id}`),
  })
  const handleClickDelete = (id) => async () => {
    await deleteUser(id)
    await refetch()
  }
  const handleClickUpdate = (id) => () => {
    router.push(`/admin/updateUser/${id}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {isFetchingUsers && session && session.role !== "admin" ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">Admin Page</h1>
          <table className="table-auto text-lg mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Activate</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      {user.isActivate ? "yes" : "no"}
                    </td>
                    <td className="border px-4 py-2">
                      <Button onClick={handleClickDelete(user.id)}>
                        Delete
                      </Button>
                    </td>
                    <td className="border px-4 py-2">
                      <Button onClick={handleClickUpdate(user.id)}>
                        Update
                      </Button>
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

export default AdminPage
