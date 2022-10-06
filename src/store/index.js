import create from 'zustand';

export const useStore = create((set) => ({
  loadingCanvas: true,
  setLoadingCanvas: (bool) =>
    set((state) => ({
      ...state,
      loadingCanvas: bool,
    })),
  loadingLoader: true,
  setLoadingLoader: (bool) =>
    set((state) => ({
      ...state,
      loadingLoader: bool,
    })),
  activePlanet: null,
  observeMode: false,
  setActivePlanet: (planet) => {
    set((state) => ({
      ...state,
      observeMode: false,
      activePlanet: planet,
    }));
  },
  setObserveMode: (bool) =>
    set((state) => ({
      ...state,
      observeMode: bool,
    })),
  planets: [],
  setPlanets: (planet) =>
    set((state) => ({
      ...state,
      planets: [...state.planets, planet],
    })),
}));
