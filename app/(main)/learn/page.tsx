import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { Unit } from "./_components/unit";
import { UnitBanner } from "./_components/unit-banner";
import { NextChapter } from "./_components/next-chapter";

const Learn = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const userSubscriptionData = getUserSubscription()
    const chaptersData = getUnits()
    const lessonPercentageData = getLessonPercentage()
    const [
        userProgress,
        courseProgress,
        chapters,
        lessonPercentage,
        userSubscription
    ] = await Promise.all([
        userProgressData,
        courseProgressData,
        chaptersData,
        lessonPercentageData,
        userSubscriptionData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }
    if (!courseProgress) {
        redirect("/courses")
    }
    const isPro = !!userSubscription?.isActive;
    return (
        <div className=" flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
            </StickyWrapper>
            <FeedWrapper >
                {/* <UnitBanner chapter={"chapter"} title={"title"} description={"description"} /> */}
                {
                    chapters.map((chapter, index) => (
                        <div key={chapter.id}>                            
                            { index === 0 ?  chapter.normalizedUnits.map((unit) => (
                                <div key={unit.id}>
                                    <Unit
                                        chapter={unit.chapter}
                                        id={unit.id}
                                        order={unit.order}
                                        description={unit.description}
                                        title={unit.title}
                                        lessons={unit.lessons}
                                        activeLesson={courseProgress.activeLesson}
                                        activeLessonPercentage={lessonPercentage}
                                    />
                                </div>
                            )):<NextChapter title={chapter.title} description={chapter.description}/>}
                        </div>
                    ))
                }
            </FeedWrapper>
        </div>
    );
}

export default Learn;