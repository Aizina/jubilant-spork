// store/accountSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountAPI } from '../services/api';

interface AccountState {
  info: {
    usedCompanyCount: number;
    companyLimit: number;
  };
  balance: {
    freeSearchAmount: number;
    totalDocuments: number;
    totalIdentifiedDocuments: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  info: {
    usedCompanyCount: 0,
    companyLimit: 0,
  },
  balance: {
    freeSearchAmount: 0,
    totalDocuments: 0,
    totalIdentifiedDocuments: 0,
  },
  loading: false,
  error: null,
};

export const fetchAccountInfo = createAsyncThunk(
  'account/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountAPI.getInfo();
      return response.data.eventFiltersInfo;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Unknown error');
    }
  }
);

export const fetchAccountBalance = createAsyncThunk(
  'account/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountAPI.getBalance();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Unknown error');
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Info reducers
      .addCase(fetchAccountInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.info = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Balance reducers
      .addCase(fetchAccountBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccountBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountSlice.reducer;