import { cache } from "react"
import db from "@/db/drizzle"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm";
import { challengeOptions, challengeProgress, challenges, chapters, courses, lessons, units, userProgress, userSubscription } from "@/db/schema";



export const getUserProgress = cache(async () => {
    const { userId } = await auth();
    if (!userId) {
        return null
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })

    return data
})


export const getUnits = cache(async () => {
    const { userId } = await auth()
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }
    const data = await db.query.chapters.findMany({
        limit:2,
        orderBy: (chapters, { asc }) => [asc(chapters.order)],
        where:( eq(chapters.courseId, userProgress.activeCourseId), eq(chapters.completed,false)),
        with: {
            units: { 
                orderBy: (chapters, { asc }) => [asc(chapters.order)],
                with: {
                    chapter:true,
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                        with: {
                            challenges: {
                                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                                with: {
                                    challengeProgress: {
                                        where: eq(challengeProgress.userId, userId)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const chaptersData = data.map((chapter) => {        
        const normalizedUnits = chapter.units.map((unit) => {
            const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
                if (lesson.challenges.length === 0) {
                    return {
                        ...lesson, completed: false
                    }
                }
                const allCompletedChallenges = lesson.challenges.every((challenge) => {
                    return challenge.challengeProgress
                        && challenge.challengeProgress.length > 0
                        && challenge.challengeProgress.every((progress) => progress.completed)
                });
                return { ...lesson, completed: allCompletedChallenges }
            })
            
            return { ...unit, lessons: lessonsWithCompletedStatus }
        });

        return {
            ...chapter ,
            normalizedUnits
        }
    });
   
    return chaptersData
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()
    return data
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            chapters: {
                orderBy: (chapters, { asc }) => [asc(chapters.order)],
                with: {
                    units: {
                        orderBy: (units, { asc }) => [asc(units.order)],
                        with:{
                            lessons:{
                                orderBy: (lessons, { asc }) => [asc(lessons.order)]
                            }
                        }
                    }
                }
            }
        }
        //TODO:Populate unit and lessons
    })

    return data
})

//TODO FINISHED CLEAN UP
export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return null
    }

    const chaptersInActiveCourse = await db.query.chapters.findMany({
        orderBy: (chapters, { asc }) => [asc(chapters.order)],
        where: eq(chapters.courseId, userProgress.activeCourseId),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                        with: {
                            unit: true,
                            challenges: {
                                with: {
                                    challengeProgress: {
                                        where: eq(challengeProgress.userId, userId)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const chaptersUnits = chaptersInActiveCourse.map((chapter) => {
        
        const firstUncompletedLesson = chapter.units.flatMap((unit) => unit.lessons)
            .find((lesson) => {
                return lesson.challenges.some((challenge) => {
                    return !challenge.challengeProgress ||
                        challenge.challengeProgress.length === 0 ||
                        challenge.challengeProgress.some((progress) => progress.completed === false)
                })
            })
        return {
            activeLesson: firstUncompletedLesson,
            activeLessonId: firstUncompletedLesson?.id
        }

    })

    return {
        activeLesson: chaptersUnits[0].activeLesson,
        activeLessonId: chaptersUnits[0]?.activeLessonId
    }

})

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }
    const courseProgress = await getCourseProgress()

    const lessonId = id || courseProgress?.activeLessonId
    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })
    if (!data || !data.challenges) {
        return null
    }

    const normalizedDataChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress &&
            challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((progress) => progress.completed)
        return {
            ...challenge, completed
        }
    })

    return {
        ...data, challenges: normalizedDataChallenges
    }

})

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if (!courseProgress?.activeLesson) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0;
    }

    const completedChallenges = lesson.challenges
        .filter((challenge) => challenge.completed);

    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100
    )

    return percentage
})

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
    const { userId } = await auth();

    if (!userId) return null;

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId),
    });

    if (!data) return null;

    const isActive =
        data.stripePriceId &&
        data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return {
        ...data,
        isActive: !!isActive,
    };
});