'use client';

import { useStore as use } from 'zustand';

import { createContext, type ReactNode, useContext, useEffect, useRef } from 'react';

import { createStore, Store } from '@/lib/stores/store';

import { db } from '@/lib/firebase/db';

export type StoreApi = ReturnType<typeof createStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const store = useRef<StoreApi>(createStore());

    const { setCurrentLike } = store.current.getState();

    useEffect(() => {
        db.ref('likes').on('value', (snapshot) => {
            setCurrentLike(snapshot.val());
        });
    }, [setCurrentLike]);

    return <StoreContext.Provider value={store.current}>{children}</StoreContext.Provider>;
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
    const storeContext = useContext(StoreContext);
    if (!storeContext) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return use(storeContext, selector);
};
