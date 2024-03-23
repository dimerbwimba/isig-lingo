import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, boolean } from "drizzle-orm/pg-core";


//-----------------courses TABLE -----------------------------------------------------

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),

})

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units)
}))
//-----------------End courses TABLE-----------------------------------------------------


//-----------------units TABLE-----------------------------------------------------

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull()
})

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lesson: many(lessons)
}))
//-----------------End units TABLE-----------------------------------------------------


//-----------------lessons TABLE -----------------------------------------------------

export const lessons = pgTable("lessons",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId:integer("unit_id").references(() => units.id,{onDelete:"cascade"} ).notNull(),
    order:integer("order").notNull()
})

export const lessonsRelations = relations(lessons, ({one,many})=>({
    unit : one(units,{
        fields:[lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}))

//-----------------END lessons TABLE -----------------------------------------------------


//-----------------challenges TABLE -----------------------------------------------------

export const challengesEnum = pgEnum("type",["SELECTED","ASSIST"])

export const challenges = pgTable("challenges",{
    id: serial("id").primaryKey(),
    lessonId:integer("lesson_id").references(()=>lessons.id,{onDelete:"cascade"}).notNull(),
    type:challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order:integer("order").notNull()

}) 

export const challengesRelations = relations(challenges, ({one,many})=>({
    lesson: one(lessons,{
        fields:[challenges.lessonId],
        references:[lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}))

//-----------------END challenges TABLE -----------------------------------------------------






//-----------------challenges_options TABLE -----------------------------------------------------


export const challengeOptions = pgTable("challenge_options",{
    id:serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(()=> challenges.id,{onDelete:"cascade"}).notNull(),
    text: text("text").notNull(),
    correct:boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
})

export const challengeOptionsRelations = relations(challengeOptions, ({one})=>({
    challenge: one(challenges,{
        fields:[challengeOptions.challengeId],
        references:[challenges.id]
    })
}))


//-----------------End challenges_options TABLE -----------------------------------------------------


//-----------------challenges_progress TABLE -----------------------------------------------------


export const challengeProgress = pgTable("challenge_progress",{
    id:serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(()=> challenges.id,{onDelete:"cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false),


})

export const challengeProgressReProgress = relations(challengeProgress, ({one})=>({
    challenge: one(challenges,{
        fields:[challengeProgress.challengeId],
        references:[challenges.id]
    })
}))


//-----------------End challenges_progress TABLE -----------------------------------------------------


//-----------------user_progress TABLE -----------------------------------------------------


export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, {
        onDelete: "cascade"
    }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
})

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}))

//-----------------END user progress TABLE -----------------------------------------------------
