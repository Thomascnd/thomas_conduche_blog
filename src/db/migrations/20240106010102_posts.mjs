export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table.integer("userId").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("cascade")
    table.text("title").notNullable()
    table.text("description").notNullable()
    table.integer("views").notNullable().defaultTo(0)
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}