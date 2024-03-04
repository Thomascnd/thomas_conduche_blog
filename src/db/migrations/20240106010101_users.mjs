export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("username").unique().notNullable()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.enu("role", ["user", "author", "admin"]).notNullable()
    table.boolean("isActivate").defaultTo(true)
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
