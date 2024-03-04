import mw from "@/api/mw"
import {
  idValidator,
  usernameValidator,
  emailValidator,
  roleValidator,
  statusValidator,
} from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      session: { role },
      res,
    }) => {
      if (role === "admin") {
        const user = await UserModel.query()
          .findById(userId)
          .select("id", "username", "email", "role", "isActivate")
        res.send(user)
      }
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      session: { role },
      res,
    }) => {
      if (role === "admin") {
        const user = await UserModel.query().findById(userId).throwIfNotFound()
        await user.$query().delete()
        res.send(user)
      }
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
      body: {
        username: usernameValidator,
        email: emailValidator,
        role: roleValidator,
        isActivate: statusValidator,
      },
    }),
    async ({
      input: {
        query: { userId },
        body: { username, email, role, isActivate },
      },
      models: { UserModel },
      session: { role: roleSession },
      res,
    }) => {
      if (roleSession === "admin") {
        const updatedUser = await UserModel.query().patchAndFetchById(userId, {
          username,
          email,
          role,
          isActivate,
        })
        res.send({ result: updatedUser })
      }
    },
  ],
})

export default handle
