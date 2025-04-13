import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            token: null,
            name: "Test",
            streak: 0,
            shouldDisplayError: false,
            currentAttempt: 0,
            update: "2025-04-12T01:48:57.198Z",
            buckets: [[],[],[],[],[],[],[],[],[]],


            setToken: (newToken) => set(() => ({token: newToken})),
            deleteToken: () => set(() => ({token: null})),

            setName: (newName) => set(() => ({name: newName})),
            deleteName: () => set(() => ({name: null})),

            setStreak: (newStreak) => set(() => ({streak: newStreak})),
            deleteStreak: () => set(() => ({streak: 0})),

            displayErrors: () => set(() => ({shouldDisplayError: true})),
            notDisplayErrors: () => set(() => ({shouldDisplayError: false})),

            incrementCurrentAttempt: () => set((state) => ({currentAttempt: state.currentAttempt + 1})),

            setLastUpdate: (newLastUpdate) => set(() => ({update: newLastUpdate})),

            addToBucket: (index, trackId) => set((state) => {
                const updatedBuckets = [...state.buckets];
                if (index >= 0 && index < updatedBuckets.length) {
                    updatedBuckets[index] = [...updatedBuckets[index], trackId];
                }
                return { buckets: updatedBuckets };
            }),

            removeFromBucket: (index, trackId) => set((state) => {
                const updatedBuckets = [...state.buckets];
                if (index >= 0 && index < updatedBuckets.length) {
                    updatedBuckets[index] = updatedBuckets[index].filter((id) => id !== trackId);
                }
                return { buckets: updatedBuckets };
            }),

            emptyAllBuckets: () => set(() => ({ buckets: [[], [], [], [], [], [], [], [], []] })),
        }),
        {
            name: "storage"
        }
    )
);