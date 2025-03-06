import { mysqlTable, varchar, int, timestamp, text, mysqlEnum } from 'drizzle-orm/mysql-core'

export const PetSpecies = {
    DOG: 'DOG',
    CAT: 'CAT'
} as const;

export type PetSpecies = typeof PetSpecies[keyof typeof PetSpecies];

export const pets = mysqlTable('pets', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    species: mysqlEnum('species', Object.values(PetSpecies)).notNull(),
    breed: varchar('breed', { length: 100 }).notNull(),
    age: int('age').notNull(),
    price: int('price').notNull(),
    description: text('description'),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})