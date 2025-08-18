import { useEffect } from "react";
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

export const useNoticeStore = create((set) => ({
    notice: [],
    setNotice: (notice) => set({notice}),
    fetchNotice: async () => {
        const res = await fetch("/api/notice");
        const data = await res.json();
        set({ notice: data });
    },
}));

export const useMenuBar = create((set) => ({
    menuBar: false,
    setMenuBar: (menuBar) => set({menuBar}),
}));

export const useAuthStore = create((set) => ({
    user: null,
    isLogined: false,
    setUser: (user)=> set({user, isLogined: !!user })
}));

export function useAuthListener() {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
    return () => unsubscribe();
    }, [setUser]);
}