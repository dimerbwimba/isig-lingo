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
            },
            {
                id:2,
                courseId:1,//english
                title:"Unit 2",
                description:"Apprendre Hello world",
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
         ])
         await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1,
                question:'Choisis la bonne signification du mot "merci" ',
                order:1,
                type:"SELECTED"
            },
            {
                id:2,
                lessonId:1,
                question:'"merci"',
                order:2,
                type:"ASSIST"
            },
            {
                id:3,
                lessonId:2,
                question:'Choisis la bonne signification du mot "merci" ',
                order:3,
                type:"SELECTED"
            },
            {
                id:4,
                lessonId:2,
                question:'"merci"',
                order:4,
                type:"ASSIST"
            },
         ])
         await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                imageSrc:"man.svg",
                text:"small",
                correct:false,
                audioSrc:"en_small.mp3"
            },
            {
                id:2,
                challengeId:1,
                imageSrc:"man.svg",
                text:"hello",
                correct:false,
                audioSrc:"en_hello.mp3"
            },
            {
                id:3,
                challengeId:1,
                imageSrc:"man.svg",
                text:"thank you",
                correct:true,
                audioSrc:"en_thank_you.mp3"
            },
            {
                id:4,
                challengeId:1,
                imageSrc:"man.svg",
                text:"happy",
                correct:false,
                audioSrc:"en_happy.mp3"
            },
            
         ])
         await db.insert(schema.challengeOptions).values([
            {
                id:5,
                challengeId:2,
                text:"small",
                correct:false,
                audioSrc:"en_small.mp3"
            },
            {
                id:6,
                challengeId:2,
                text:"hello",
                correct:false,
                audioSrc:"en_hello.mp3"
            },
            {
                id:7,
                challengeId:2,
                text:"thank you",
                correct:true,
                audioSrc:"en_thank_you.mp3"
            },
            {
                id:8,
                challengeId:2,
                text:"happy",
                correct:false,
                audioSrc:"en_happy.mp3"
            }            
         ])
         await db.insert(schema.challengeOptions).values([
            {
                id:9,
                challengeId:3,
                imageSrc:"man.svg",
                text:"small",
                correct:false,
                audioSrc:"en_small.mp3"
            },
            {
                id:10,
                challengeId:3,
                imageSrc:"man.svg",
                text:"hello",
                correct:false,
                audioSrc:"en_hello.mp3"
            },
            {
                id:11,
                challengeId:3,
                imageSrc:"man.svg",
                text:"thank you",
                correct:true,
                audioSrc:"en_thank_you.mp3"
            },
            {
                id:12,
                challengeId:3,
                imageSrc:"man.svg",
                text:"happy",
                correct:false,
                audioSrc:"en_happy.mp3"
            },
            
         ])
         await db.insert(schema.challengeOptions).values([
            {
                id:13,
                challengeId:4,
                imageSrc:"man.svg",
                text:"small",
                correct:false,
                audioSrc:"en_small.mp3"
            },
            {
                id:14,
                challengeId:4,
                imageSrc:"man.svg",
                text:"hello",
                correct:false,
                audioSrc:"en_hello.mp3"
            },
            {
                id:15,
                challengeId:4,
                imageSrc:"man.svg",
                text:"thank you",
                correct:true,
                audioSrc:"en_thank_you.mp3"
            },
            {
                id:16,
                challengeId:4,
                imageSrc:"man.svg",
                text:"happy",
                correct:false,
                audioSrc:"en_happy.mp3"
            },
            
         ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()