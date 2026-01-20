import { debounce } from '@mui/material';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const formData = {
  input: "",
  range: 5,
  num: false,
  sym: false,
}
const usePassGenStore = create((set) => ({
  ...formData,
  setInput: (input) => set({ input }),
  setRange: (range) => set({ range }),
  setNum: (num) => set({ num }),
  setSym: (sym) => set({ sym }),
  resetForm: () => set(formData),
}))
export default usePassGenStore

export const useMyStore = create((set) => ({
  clamp: 'line-clamp-1',
  setClamp: () => set((state) => ({ clamp: state.clamp === 'line-clamp-1' ? 'line-clamp-none' : 'line-clamp-1' })),
}))

export const useStoreLocal = create(persist((set) => ({
  tasks: [],
  addTasks: (text) => set((state) => ({
    tasks: [...state.tasks,
    {
      text,
      completed: false
    }]
  })),
  removeTask: (index) => set((state) => ({ tasks: state.tasks.filter((_, i) => i !== index) })),
  setChecked: (index) => set((state) => ({
    tasks: state.tasks.map((task, i) => i === index ? {
      ...task, completed: !task.completed
    } : task),
  }))

}), { name: 'tasks' }))

export const useFakeStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  debounce: null,
  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data)
      set({ products: data, loading: false })
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error: 'Failed to fetch data', loading: false })
    }
  },

}))

