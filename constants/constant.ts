
export const  POINT_TO_REFILL = 20;
export const POINTS_TO_WIN_AFTER_EACH_CHALLENGE= 1
export const quests = [
    {
      title: "Gagne 20 XP",
      value: 20,
    },
  ];

export const activeCourseTitleTranslate = (course:string | undefined)=>{
    switch (course) {
      case "English":
        return "englais"
      default:
        break;
    }
}