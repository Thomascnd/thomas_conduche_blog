export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.integer("userId").notNullable().references("id").inTable("users").onDelete("cascade").onUpdate("cascade")
    table.integer("postId").notNullable().references("id").inTable("posts").onDelete("cascade").onUpdate("cascade")
    table.text("title").notNullable()
    table.text("description").notNullable()
    table.timestamps(true, true, true)
  })
}

export const down = async (db) =>{
  await db.schema.dropTable("comments")
}