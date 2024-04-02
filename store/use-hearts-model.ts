import { create } from "zustand";
 
type FinishHeartsState = {
    isOpen:boolean;
    open:()=> void;
    close:()=> void;
}

export const useFinishHearts = create<FinishHeartsState>((set)=>({
    isOpen:false,
    open:()=> set({ isOpen:true}),
    close:()=> set({ isOpen:false})

}))