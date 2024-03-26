import { create } from "zustand";
 
type OutModalState = {
    isOpen:boolean;
    open:()=> void;
    close:()=> void;
}

export const useOutModal = create<OutModalState>((set)=>({
    isOpen:false,
    open:()=> set({ isOpen:true}),
    close:()=> set({ isOpen:false})

}))