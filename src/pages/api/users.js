import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
  roleValidator,
} from "@/utils/validators"
import auth from "@/api/middlewares/auth"

const handle = mw({
  POST: [
    validate({
      body: {
        username: usernameValidator,
        email: emailValidator,
        password: passwordValidator,
        role: roleValidator,
      },
    }),
    async ({
      input: {
        body: { username, email, password, role },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        username,
        email,
        passwordHash,
        passwordSalt,
        role,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth,
    async ({ models: { UserModel }, res }) => {
      const users = await UserModel.query()
        .select("id", "username", "email", "role", "isActivate")
        .orderBy("id")
      res.send(users)
    },
  ],
})

export default handle
