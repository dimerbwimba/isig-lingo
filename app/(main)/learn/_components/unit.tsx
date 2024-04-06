import { chapters, lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { UnitHeader } from "./unit-hearder";

type Props={
    id: number;
    order:number;
    description:string;
    title:string;
    lessons: (typeof lessons.$inferSelect & {
        completed:boolean
    })[]
    activeLesson:  typeof lessons.$inferSelect &{
        unit: typeof units.$inferSelect
    } | undefined;
    activeLessonPercentage:number,
    chapter: typeof chapters.$inferSelect
}


export const Unit=({
    id,
    order,
    chapter,
    description,
    title,
    lessons, 
    activeLesson, 
    activeLessonPercentage
}:Props)=>{
    return (
        <>
           { id !== 1 && <UnitHeader description={description}/>}
            <div className="flex items-center flex-col relative">
                {
                    lessons.map((lesson, index)=>{
                        const isCurrent = lesson.id === activeLesson?.id;
                        const isLocked = !lesson.completed && !isCurrent;
                        return(
                            <LessonButton
                                key={lesson.id}
                                id={lesson.id}
                                title={title}
                                description={description}
                                index={index}
                                totalCount={lessons.length-1}
                                current={isCurrent} //TODO:update hardcoded true
                                locked={isLocked}
                                percentage={activeLessonPercentage}
                            />
                        )
                    })
                }
            </div>
        </>
    )

}