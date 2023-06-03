import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOverlay, selectCommentId, selectReplyId } from '../../features/dataSlice';

function Delete() {
	const dispatch = useDispatch();
	const id = useSelector(selectCommentId);
	const replyId = useSelector(selectReplyId);
	const [ dataReply, setDataReply ] = useState();
	const [ dataComment, setDataComment ] = useState();
	const [ error, setError ] = useState();
	const cancelHandler = () => {
		dispatch(toggleOverlay(false));
	};
	const deleteReplyHandler = async () => {
		try {
			const response = await fetch(`/comments/${id}/replies/${replyId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'aplication/json'
				}
			});
			const responseData = await response.json();
			setDataReply(responseData);
			if (!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (err) {
			setError(err.message || 'Something went wrong');
			console.log(err);
		}
		dispatch(toggleOverlay(false));
	};

	const deleteCommentHandler = async () => {
		try {
			const response = await fetch(`/comments/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'aplication/json'
				}
			});
			const responseData = await response.json();
			setDataComment(responseData);
			if (!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (err) {
			setError(err.message || 'Something went wrong');
			console.log(err);
		}
		dispatch(toggleOverlay(false));
	};

	return (
		<main className="rounded-lg p-6 bg-white z-40 bg-opacity-100">
			<h2 className="text-xl text-dark-blue mb-4 font-medium">Delete comment</h2>
			<p className="font-normal text-base text-grayish-blue mb-4">
				Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
			</p>
			<div className="flex justify-between items-center">
				<button
					className="rounded-lg bg-grayish-blue text-white uppercase pt-3 pb-3 pl-5 pr-5"
					onClick={cancelHandler}
				>
					No, Cancel
				</button>
				<button
					className="rounded-lg bg-soft-red text-white uppercase pt-3 pb-3 pl-5 pr-5"
					onClick={replyId ? deleteReplyHandler : deleteCommentHandler}
				>
					Yes, Delete
				</button>
			</div>
		</main>
	);
}

export default Delete;
