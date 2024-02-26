import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default PostModel