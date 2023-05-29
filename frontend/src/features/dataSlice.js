import { createSlice } from '@reduxjs/toolkit';


export const dataSlice = createSlice({
	name: 'data',
	initialState: {
		overlay: false,
		commentId: 0,
		replyId: 0
		
	},
	reducers: {
		toggleOverlay: (state, action) => {
			console.log('from redux', state, action)
			state.overlay = action.payload;
		},
		setCommentId: (state, action) => {
			state.commentId = action.payload
		},
		setReplyId: (state, action) => {
			state.replyId = action.payload
		},
	}
});

export const { toggleOverlay, setCommentId, setReplyId} = dataSlice.actions;

export const selectOverlay = (state) => state.data.overlay;
export const selectCommentId = (state) => state.data.commentId;
export const selectReplyId = (state) => state.data.replyId;

export default dataSlice.reducer;