import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET:[
    auth,
    async ({
      models: { PostModel },
      session: { id: userId, role},
      res,
    }) => {
      if(role === "author") {
      const posts = await PostModel.query().select("posts.*", "user.username as username").joinRelated("user").where("user.id", userId)
      res.send(posts)
    }
  }
  ]
})

export default handle