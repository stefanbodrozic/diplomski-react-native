import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  doc,
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { Status } from '../../util'

export const fetchUserDetails = createAsyncThunk(
  'users/userDetails',
  async (data) => {
    try {
      const { email, expoPushToken } = data

      let user = null

      const q = query(collection(db, 'users'), where('email', '==', email))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(async (document) => {
        const {
          id,
          username,
          firstname,
          lastname,
          email,
          role,
          address,
          storeName,
          storeRefId,
          expoPushToken
        } = document.data()

        user = {
          docId: document.id,
          id,
          username,
          firstname,
          lastname,
          email,
          role,
          address,
		  expoPushToken
        }

        if (storeName) {
          user.storeName = storeName
          user.storeRefId = storeRefId
        }

        // sync expo token

        const userDocRef = doc(db, 'users', document.id)

        await updateDoc(userDocRef, {
          expoPushToken
        })
      })

      return user
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  data: {},
  status: Status.IDLE,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = {}
      state.status = Status.IDLE
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserDetails.pending, (state, _action) => {
        state.status = Status.PENDING
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = Status.FULLFILED
        state.data = action.payload
      })
      .addCase(fetchUserDetails.rejected, (state, _action) => {
        state.status = Status.FAILED
      })
  }
})

export const getUserData = (state) => state.user.data
export const getUserStatus = (state) => state.user.status

export const { logout } = userSlice.actions

export default userSlice.reducer
