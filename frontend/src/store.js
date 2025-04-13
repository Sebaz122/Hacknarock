import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            token: null,
            tokenExpiration: null,
            name: "Test",
            streak: 0,
            shouldDisplayError: false,
            currentAttempt: 0,
            lastUpdate: null,


            setToken: (newToken) => set(() => ({token: newToken})),
            deleteToken: () => set(() => ({token: null})),

            setTokenExpiration: (newTokenExpiration) => set(() => ({token: newTokenExpiration})),

            setName: (newName) => set(() => ({name: newName})),
            deleteName: () => set(() => ({name: null})),

            setStreak: (newStreak) => set(() => ({streak: newStreak})),
            deleteStreak: () => set(() => ({streak: 0})),

            displayErrors: () => set(() => ({shouldDisplayError: true})),
            notDisplayErrors: () => set(() => ({shouldDisplayError: false})),

            incrementCurrentAttempt: () => set((state) => ({currentAttempt: state.currentAttempt + 1})),

            setLastUpdate: (newLastUpdate) => set(() => ({lastUpdate: newLastUpdate})),
        }),
        {
            name: "storage"
        }
    )
);