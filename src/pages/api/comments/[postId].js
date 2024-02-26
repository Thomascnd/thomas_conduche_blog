/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* eslint-disable no-console */
import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import {idValidator, titleValidator, descriptionValidator} from "@/utils/validators"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET:[
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { CommentModel },
      input: { 
        query: { postId }
      },
      res,
    }) => {
      console.log(postId)
      const comments = await CommentModel.query().select("title", "description", "user.username as username").joinRelated("user").where("postId", postId)//.where("comments.postId", postId)//  "user",, "user.username as username"

      console.log(comments)
      res.send(comments)
    }
  ],
  POST: [
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
          body: { title, description },
          query: { postId },
        },
        models: { CommentModel },
        session: { id: userId },
        res,
    }) => {
      const comment = await CommentModel.query().insertAndFetch({ userId, postId, title, description })
      res.send(comment)
    },
  ],
  
})

export default handle