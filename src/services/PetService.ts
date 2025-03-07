import { db } from '../db'
import { pets } from '../db/schema'
import { eq } from 'drizzle-orm'
import { saveImage } from '../utils/upload'

export class PetService {
    static async create(petData: any) {
        const imageUrl = petData.image ? await saveImage(petData.image) : null

        const newPet = await db.insert(pets).values({
            ...petData,
            imageUrl
        }).execute()

        return newPet
    }

    static async getAll() {
        return db.select().from(pets)
    }

    static async getById(id: number) {
        const pet = await db.select().from(pets).where(eq(pets.id, id))
        return pet[0]
    }

    static async update(id: number, petData: any) {
        let imageUrl = petData.image ? await saveImage(petData.image) : undefined

        const updateData = {
            ...petData,
            ...(imageUrl && { imageUrl })
        }

        await db.update(pets).set(updateData).where(eq(pets.id, id)).execute()

        return this.getById(id)
    }

    static async delete(id: number) {
        return await db.delete(pets).where(eq(pets.id, id)).execute()
    }
}