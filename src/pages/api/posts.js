import mw from "@/api/mw"
import { titleValidator, descriptionValidator } from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        title: titleValidator,
        description: descriptionValidator,
      },
    }),
    async ({
      input: {
        body: { title, description },
      },
      models: { PostModel },
      session: { id: userId, role },
      res,
    }) => {
      if (role === "author") {
        const post = await PostModel.query().insertAndFetch({
          userId,
          title,
          description,
        })
        res.send(post)
      }
    },
  ],
  GET: [
    async ({ models: { PostModel }, res }) => {
      const posts = await PostModel.query()
        .select("posts.*", "user.username as username")
        .joinRelated("user")
        .orderBy("posts.createdAt", "desc")
      res.send(posts)
    },
  ],
})

export default handle
