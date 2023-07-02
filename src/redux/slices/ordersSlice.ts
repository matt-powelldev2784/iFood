import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { AppState } from '../store/store'
import { apiCall } from '@/utils/apiUtil'
import { ApiErrorMsg } from '@/ts/interfaces'
import { TSOrder, TSOrderItem } from '@/ts/interfaces'

export interface OrdersState {
  orders: TSOrderItem[]
  errors: ApiErrorMsg[] | string[] | null
  isLoading: boolean
}

export interface UserId {
  userId: string
}

export interface OrderId {
  orderId: string
}

const initialState: OrdersState = {
  orders: [],
  errors: null,
  isLoading: false,
}

export const getUserOrders = createAsyncThunk(
  'orderState/orders',
  async (userId: UserId): Promise<any> => {
    try {
      const res = await apiCall({
        httpMethod: 'GET',
        route: `api/v1/order/${userId}`,
      })
      const { data } = res
      return data
    } catch (err: any) {
      throw Error(err)
    }
  }
)

export const confirmOrder = createAsyncThunk(
  'orderState/confirmOrder',
  async ({ orderId }: OrderId): Promise<any> => {
    try {
      const res = await apiCall({
        httpMethod: 'POST',
        route: `api/v1/order/confirm-order/${orderId}`,
      })
      const { data } = res
      return data
    } catch (err: any) {
      throw Error(err)
    }
  }
)

export const sendEmailConfirmation = createAsyncThunk(
  'orderState/sendEmailConfirmation',
  async ({ orderId }: OrderId): Promise<any> => {
    try {
      const res = await apiCall({
        httpMethod: 'POST',
        route: `api/v1/order/send-email-confirmation/${orderId}`,
      })
      const { data } = res
      return data
    } catch (err: any) {
      throw Error(err)
    }
  }
)

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrdersState(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder
      //---------------------------------------------------------------------
      .addCase(getUserOrders.pending, (state) => {
        state.orders = []
        state.errors = null
        state.isLoading = true
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.orders = payload
        state.errors = null
        state.isLoading = false
      })
      .addCase(getUserOrders.rejected, (state, { error }: AnyAction) => {
        state.orders = []
        state.errors = null
        state.errors = [error.message]
        state.isLoading = false
      })

    //---------------------------------------------------------------------
  },
})

export const selectOrdersSlice = (state: AppState) => state.orders
export const { resetOrdersState } = ordersSlice.actions

export default ordersSlice.reducer
