import mw from "@/api/mw"
import {
  idValidator,
  titleValidator,
  descriptionValidator,
} from "@/utils/validators"
import { validate } from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query()
        .select(
          "title",
          "description",
          "posts.updatedAt",
          "user.username as username",
        )
        .joinRelated("user")
        .where("posts.id", postId)
      res.send(post[0])
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        postId: idValidator,
      },
      body: {
        title: titleValidator,
        description: descriptionValidator,
      },
    }),
    async ({
      input: {
        query: { postId },
        body: { title, description },
      },
      models: { PostModel },
      session: { role },
      res,
    }) => {
      if (role === "author") {
        const updatedPost = await PostModel.query().patchAndFetchById(postId, {
          title,
          description,
        })
        res.send({ result: updatedPost })
      }
    },
  ],
})

export default handle
