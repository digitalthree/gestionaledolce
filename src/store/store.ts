import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {rtkqApi} from "@/store/rtkqApi";

const rootReducer = combineReducers({
    rtkqApi: rtkqApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(rtkqApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch