import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DemoPersona = 'newcomer' | 'member' | 'manager' | 'admin';

export interface DemoState {
  persona: DemoPersona;
}

const initialState: DemoState = {
  persona: (localStorage.getItem('demoPersona') as DemoPersona) || 'member',
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setPersona(state, action: PayloadAction<DemoPersona>) {
      state.persona = action.payload;
      localStorage.setItem('demoPersona', action.payload);
      if (action.payload === 'newcomer') {
        localStorage.removeItem('ikame_has_seen_welcome');
      }
      window.location.reload(); 
    },
    resetDemo(state) {
      state.persona = 'member';
      localStorage.removeItem('demoPersona');
      localStorage.removeItem('demoQuestProgress');
      localStorage.removeItem('ikame_has_seen_welcome');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('demoExp_')) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload(); 
    },
  },
});

export const { setPersona, resetDemo } = demoSlice.actions;
export default demoSlice.reducer;
