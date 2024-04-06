import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./_component/quiz";
import { FinishChapterView } from "./_component/finish-chapter-view";
import { use } from "react";

const LessonPage = async () => {
    const lessonData =  getLesson();
    const userProgressData =  getUserProgress();
    const userSubscriptionData = getUserSubscription()

    const [
        lesson,
        userProgress,
        userSubscription
    ] = await Promise.all([
        lessonData,
        userProgressData,
        userSubscriptionData
    ])

    const isPro = !!userSubscription?.isActive;
    if (!lesson || !userProgress) {
       return <FinishChapterView isPro={isPro} hearts={userProgress?.hearts} points={userProgress?.points} activeCourseTitle={userProgress?.activeCourse?.title}/>
    }
    const initialPercentage = lesson.challenges.filter((challenge)=> challenge.completed).length / lesson.challenges.length * 100
    return ( 
        <Quiz
            initialLessonId = {lesson.id}
            initialLessonChallenges = {lesson.challenges}
            initialHearts = {userProgress.hearts}
            initialPercentage = {initialPercentage}
            userSubscription = {isPro}

        />
     );
}
 
export default LessonPage;