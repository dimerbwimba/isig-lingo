import { create } from "zustand";
 
type PracticeModelState = {
    isOpen:boolean;
    open:()=> void;
    close:()=> void;
}

export const usePracticeModel = create<PracticeModelState>((set)=>({
    isOpen:false,
    open:()=> set({ isOpen:true}),
    close:()=> set({ isOpen:false})

}))