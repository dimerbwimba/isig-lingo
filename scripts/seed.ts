import "dotenv/config"

import { drizzle } from "drizzle-orm/neon-http"

import {neon} from "@neondatabase/serverless"

import * as schema from "@/db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql,{schema})


const main = async () =>{
    try {
        console.log("Seeding on the way...")
        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeProgress)
        await db.delete(schema.challengeOptions)

        await db.insert(schema.courses).values([
            {
                id:1,
                title:"English",
                imageSrc:"/en.svg"
            },
            {
                id:2,
                title:"Spanish",
                imageSrc:"/es.svg"
            }
        ])

         await db.insert(schema.units).values([
            {
                id:1,
                courseId:1,//english
                title:"Unit 1",
                description:"Apprendre le base de l'Anglais",
                order:1
            }
         ])

         await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,// unit 1
                title:"Apprendre les Bases des Salutations",
                order:1
            },
            {
                id:2,
                unitId:1,// unit 1
                title:"Faire les Premières Présentations",
                order:2
            },
            {
                id:3,
                unitId:1,// unit 1
                title:"Découvrir les Chiffres",
                order:3
            },
            {
                id:4,
                unitId:1,// unit 1
                title:"Explorer les Couleurs",
                order:4
            },
            {
                id:5,
                unitId:1,// unit 1
                title:"Connaitre la Famille",
                order:5
            },
            {
                id:6,
                unitId:1,// unit 1
                title:"Découvrir les Mois de l'Année",
                order:6
            },
         ])

         await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1,
                question:'Choisis la bonne signification du mot "merci" ',
                order:1,
                type:"SELECTED"
            },
         ])


         await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                imageSrc:"man.svg",
                text:"small",
                correct:false,
            },
            {
                id:2,
                challengeId:1,
                imageSrc:"man.svg",
                text:"hello",
                correct:false,
            },
            {
                id:3,
                challengeId:1,
                imageSrc:"man.svg",
                text:"thank you",
                correct:true,
            }

         ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()