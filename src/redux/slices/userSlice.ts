import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { AppState } from '../store/store'
import { apiCall } from '@/utils/apiUtil'
import { ApiErrorMsg } from '@/ts/interfaces'

export interface UserState {
  id: string | null
  name: string | null
  email: string | null
  image: string | null
  errors: ApiErrorMsg[] | string[] | null
  mobileMenuIsOpen: boolean
}

interface signUpEmailPassword {
  name: string
  email: string
  password: string
  password2: string
}

interface User {
  id: string
  name: string
  email: string
  image: string | null
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  image: null,
  errors: null,
  mobileMenuIsOpen: false,
}

export const signUp = createAsyncThunk(
  'userState/signup',
  async ({
    name,
    email,
    password,
    password2,
  }: signUpEmailPassword): Promise<any> => {
    try {
      // const res = await apiCall({
      //   httpMethod: 'POST',
      //   route: 'api/v1/user/user',
      //   body: { name, email, password, password2 },
      // })

      const res = await fetch('/api/v1/user/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password2 }),
      })

      const { data } = await res.json()

      // const { data } = res
      return data
    } catch (err: any) {
      throw Error(err)
    }
  }
)

export const getAuthUser = createAsyncThunk('userState/auth', async () => {
  try {
    const res = await apiCall({
      httpMethod: 'GET',
      route: 'api/v1/user/user',
    })

    // const res = await (
    //   await fetch('/api/v1/user/user', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    // ).json()

    const user = res.data

    if (!user) {
      throw Error('No user found')
    }
    console.log('user', user)
    return user
  } catch (err: any) {
    throw Error(err)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginToOrderError(state) {
      state.errors = ['Please login or signup to place order']
    },
    resetUserState(state) {
      Object.assign(state, initialState)
    },
    toggleMobileMenu(state) {
      state.mobileMenuIsOpen = !state.mobileMenuIsOpen
    },
  },
  extraReducers: (builder) => {
    builder
      //---------------------------------------------------------------------
      .addCase(signUp.pending, (state) => {
        state.id = null
        state.name = null
        state.email = null
        state.image = null
        state.errors = null
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        const { id, name, email } = payload
        state.id = id
        state.name = name
        state.email = email
        state.errors = null
      })
      .addCase(signUp.rejected, (state, { error }: AnyAction) => {
        state.id = null
        state.name = null
        state.email = null
        state.image = null
        state.errors = [error.message]
      })

      //---------------------------------------------------------------------
      .addCase(getAuthUser.pending, (state) => {
        state.id = null
        state.name = null
        state.email = null
        state.image = null
        state.errors = null
      })
      .addCase(getAuthUser.fulfilled, (state, { payload }) => {
        const { id, name, email, image } = payload
        state.id = id
        state.name = name
        state.email = email
        state.image = image
        state.errors = null
      })
      .addCase(getAuthUser.rejected, (state, { error }: AnyAction) => {
        console.log('error.message', error.message)
        state.id = null
        state.name = null
        state.email = null
        state.image = null
        state.errors = [error.message]
      })
    //---------------------------------------------------------------------
  },
})

export const selectUsertSlice = (state: AppState) => state.user
export const { resetUserState, setLoginToOrderError, toggleMobileMenu } =
  userSlice.actions

export default userSlice.reducer
