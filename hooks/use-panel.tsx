import { create } from "zustand";

type MyStore = {
  isPanelHidden: boolean;
  togglePanel: () => void;
};

export const usePanel = create<MyStore>((set) => ({
  isPanelHidden: false,
  togglePanel: () => set((state) => ({ isPanelHidden: !state.isPanelHidden })),
}));
