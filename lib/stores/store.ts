import { createStore as create } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StateStorage } from 'zustand/middleware';

export type State = {
    currentLike: number;
    liked: boolean;
};

export type Actions = {
    setCurrentLike: (number: number) => void;
    increment: () => void;
    decrement: () => void;
    toggleLike: () => void;
};

export type Store = State & Actions;

export const storage: StateStorage = {
    getItem: (name) => (typeof localStorage !== 'undefined' ? localStorage.getItem(name) : null),
    setItem: (name, value) => typeof localStorage !== 'undefined' && localStorage.setItem(name, value),
    removeItem: (name) => typeof localStorage !== 'undefined' && localStorage.removeItem(name),
};
export const defaultInitStatt: State = {
    currentLike: 0,
    liked: storage.getItem('liked') === 'true',
};

export const createStore = (initState: State = defaultInitStatt) => {
    return create<Store>()(
        persist<Store>(
            (set) => ({
                ...initState,
                setCurrentLike: (value) => {
                    set({
                        currentLike: value,
                    });
                },
                increment: () => set((state) => ({ currentLike: state.currentLike + 1 })),
                decrement: () => set((state) => ({ currentLike: state.currentLike - 1 })),
                toggleLike: () => set((state) => ({ liked: !state.liked })),
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};
