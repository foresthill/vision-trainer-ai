import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewType } from '@repo/shared-types';

interface TrainingState {
  parallelLevel: number;
  crossLevel: number;
  totalSessions: number;
  streak: number;
  lastTrainingDate: string | null;

  incrementLevel: (type: ViewType) => void;
  decrementLevel: (type: ViewType) => void;
  recordSession: () => void;
  updateStreak: () => void;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      parallelLevel: 1,
      crossLevel: 1,
      totalSessions: 0,
      streak: 0,
      lastTrainingDate: null,

      incrementLevel: (type) =>
        set((state) => ({
          [type === 'parallel' ? 'parallelLevel' : 'crossLevel']: Math.min(
            state[type === 'parallel' ? 'parallelLevel' : 'crossLevel'] + 1,
            10
          ),
        })),

      decrementLevel: (type) =>
        set((state) => ({
          [type === 'parallel' ? 'parallelLevel' : 'crossLevel']: Math.max(
            state[type === 'parallel' ? 'parallelLevel' : 'crossLevel'] - 1,
            1
          ),
        })),

      recordSession: () =>
        set((state) => ({
          totalSessions: state.totalSessions + 1,
        })),

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastTrainingDate, streak } = get();

        if (lastTrainingDate === today) {
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastTrainingDate === yesterdayStr) {
          set({ streak: streak + 1, lastTrainingDate: today });
        } else {
          set({ streak: 1, lastTrainingDate: today });
        }
      },
    }),
    {
      name: 'training-storage',
    }
  )
);
