import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";


//-----------------courses TABLE -----------------------------------------------------

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),

})

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    chapters: many(chapters)
}))

//-----------------End courses TABLE-----------------------------------------------------


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


//-----------------Chapters TABLE-----------------------------------------------------

export const chapters = pgTable('chapters',{
    id:serial('id').primaryKey(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    completed: boolean("completed").notNull().default(false),
    isCurrent:  boolean("isCurrent").notNull().default(false),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull()
}) 

export const chaptersRelations = relations(chapters,({many, one})=>({
    course: one(courses, {
        fields: [chapters.courseId],
        references: [courses.id]
    }),
    units: many(units),
    chapterProgress:many(chapterProgress)
}))

//-----------------End Chapters TABLE-----------------------------------------------------


//-----------------chapter_progress TABLE -----------------------------------------------------


export const chapterProgress = pgTable("chapter_progress",{
    id:serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    chapterId: integer("chapter_id").references(()=> chapters.id,{onDelete:"cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false),
    isCurrent:boolean("isCurrent").notNull().default(false),
})

export const chapterProgressRelations = relations(chapterProgress, ({one})=>({
    chapter: one(chapters,{
        fields:[chapterProgress.chapterId],
        references:[chapters.id]
    })
}))


//-----------------End chapter_progress TABLE -----------------------------------------------------

//-----------------units TABLE-----------------------------------------------------

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    chapterId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull()
})

export const unitsRelations = relations(units, ({ many, one }) => ({
    chapter: one(chapters, {
        fields: [units.chapterId],
        references: [chapters.id]
    }),
    lessons: many(lessons)
}))
//-----------------End units TABLE-----------------------------------------------------


//-----------------lessons TABLE -----------------------------------------------------

export const lessonsEnum = pgEnum("type",["NORMAL","REVISION","ENTRAINEMENT"])

export const lessons = pgTable("lessons",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId:integer("unit_id").references(() => units.id,{onDelete:"cascade"} ).notNull(),
    type: lessonsEnum("type").notNull(),
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

export const challengesEnum = pgEnum("type",["SELECT","ASSIST"])

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

export const challengeProgressRelations = relations(challengeProgress, ({one})=>({
    challenge: one(challenges,{
        fields:[challengeProgress.challengeId],
        references:[challenges.id]
    })
}))


//-----------------End challenges_progress TABLE -----------------------------------------------------

//-----------------Star user subscription TABLE -----------------------------------------------------

export const userSubscription = pgTable("user_subscription", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull().unique(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
  });

//-----------------END user subscription TABLE -----------------------------------------------------

