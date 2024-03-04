import { faker } from "@faker-js/faker"

export const seed = async (db) => {
  await db("comments").delete()
  await db("posts").delete()
  await db("users").delete()

  const users = await db("users")
    .insert(
      [...Array(5)].map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: "alskdjalsdkjasdlkj",
        passwordSalt: "alskdjalsdkjasdlkj",
        role: "user",
        isActivate: true,
      })),
    )
    .returning("*")
  const posts = await db("posts")
    .insert(
      [...new Array(30)].map(() => ({
        userId:
          users[faker.datatype.number({ min: 0, max: users.length - 1 })].id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
      })),
    )
    .returning("*")
  await db("comments")
    .insert(
      [...new Array(30)].map(() => ({
        userId:
          users[faker.datatype.number({ min: 0, max: users.length - 1 })].id,
        postId:
          posts[faker.datatype.number({ min: 0, max: posts.length - 1 })].id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
      })),
    )
    .returning("*")
}
