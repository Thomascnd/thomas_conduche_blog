import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { emailValidator, usernameValidator } from "@/utils/validators"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET : [ 
    auth,
    async ({
      models: { UserModel },
      session: { id: userId },
      res,
    }) => {
      const user = await UserModel.query().findById(userId)
      res.send(user,
      )
    }
  ],    
  PATCH:[
    auth,
    validate({
      body: {
        username: usernameValidator,
        email: emailValidator,
      },
    }),
    async ({
      input: {
        body: { username, email},
      },
      models: { UserModel },
      session: { id: userId },
      res,
    }) => {
      const updatedUser = await UserModel.query().patchAndFetchById(userId, { username, email})
      res.send(updatedUser)
    }]
  
})

export default handle


