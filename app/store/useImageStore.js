import { create } from "zustand";

export const useImageStore = create((set) => ({
    cards: [],
    setCards: (cards) => set({cards}),
    fetchCards: async () => {
        const res = await fetch("/api/data");
        const data = await res.json();
        set({ cards: data });
    },
}));

export const useMenuBar = create((set) => ({
    menuBar: false,
    setMenuBar: (menuBar) => set({menuBar}),
}));