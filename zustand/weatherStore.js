import create from "zustand";

export const useWeatherStore = create((set) => ({
  activeLocal: null,
  loading: 0,
  weatherData: null,
  setLocal: (newLocal) =>
    set({
      activeLocal: newLocal,
    }),
  setLoading: (num) => set({ loading: num }),
  setWeather: (newData) =>
    set({
      weatherData: newData,
    }),
}));
