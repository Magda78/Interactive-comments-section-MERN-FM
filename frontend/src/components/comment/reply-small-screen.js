import React, { useState } from 'react';
import SendComment from '../send-comment';
import { useDispatch } from 'react-redux';
import { toggleOverlay, setCommentId, setReplyId } from '../../features/dataSlice';
import addHandler from '../../utils/addHandler';
import minusHandler from '../../utils/minusHandler';

function ReplySmallScreen({
	idComment,
	idReply,
	usernameComment,
	usernameReply,
	commentReply,
	image,
	createdAtReply,
	contentReply,
	buttonText,
	scoreReply,
	replyingTo,
	png,
	webp,
	diffInDays
}) {
	const [ count, setCount ] = useState(scoreReply);
	const [ open, setOpen ] = useState(false);
	const [ likePressed, setLikePressed ] = useState(false);
	const [ dislikePressed, setDislikePressed ] = useState(false);
	const dispatch = useDispatch();
	const [ edit, setEdit ] = useState(false);
	const [ inputField, setInputField ] = useState(contentReply);
	const [ data, setData ] = useState();
	const [ error, setError ] = useState();

	const addLikeHandler = () => {
		addHandler(count, likePressed, setCount, updateScoreHandler, setLikePressed, dislikePressed, setDislikePressed);
	};

	const minusLikeHandler = () => {
		minusHandler(
			dislikePressed,
			setCount,
			count,
			updateScoreHandler,
			setDislikePressed,
			likePressed,
			setLikePressed
		);
	};

	const replyHandler = () => {
		setOpen(true);
	};

	const updateScoreHandler = async (updateData) => {
		try {
			const response = await fetch(`/comments/${idComment}/replies/${idReply}/score`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({
					score: updateData
				})
			});
			const responseData = await response.json();
			setData(responseData);

			if (!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (err) {
			setError(err.message || 'Something went wrong');
			console.log(err);
		}
	};

	const deleteWidgetHandler = () => {
		dispatch(toggleOverlay(true));
		dispatch(setCommentId(idComment));
		dispatch(setReplyId(idReply));
	};
	const editHandler = async () => {
		setEdit(true);
	};
	const inputHandler = (e) => {
		setInputField(e.target.value);
	};
	const updateHandler = async () => {
		try {
			const response = await fetch(`/comments/${idComment}/replies/${idReply}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({
					content: inputField
				})
			});
			const responseData = await response.json();
			setData(responseData);

			if (!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (err) {
			setError(err.message || 'Something went wrong');
			console.log(err);
		}
		setEdit(false);
	};
	return (
		<main>
			<div className="p-4 flex flex-col bg-component-background rounded-lg mb-4">
				<div className="h-8 mb-5 rounded-full bg-red-500 flex flex-row justify-start items-center">
					<div className="w-8 h-8 rounded-full">
						<img src={png} alt="avatar" />
					</div>
					<h1
						className={`${usernameReply === 'juliusomo'
							? 'mr-2 ml-4'
							: 'mr-4 ml-4'}  text-dark-blue text-base font-medium`}
					>
						{usernameReply}
					</h1>
					{usernameReply === 'juliusomo' ? (
						<div className="mr-4 pl-1.5 pr-1.5 bg-moderate-blue rounded-sm font-medium text-white text-[13px]">
							<p>you</p>
						</div>
					) : null}

					<h2 className="text-grayish-blue text-base font-normal">{diffInDays}</h2>
				</div>
				{edit ? (
					<div>
						<textarea
							value={inputField}
							className="focus:outline-none border-[1px] pt-3 pl-6 h-24 mb-3.5 text-base font-normal text-grayish-blue leading-6 border-light-gray rounded-md w-[100%] resize-none cursor-pointer"
							onChange={inputHandler}
						/>
					</div>
				) : (
					<div className=" text-grayish-blue text-base font-normal mb-4">
						<span className="text-moderate-blue font-medium">{contentReply.split(' ')[0].concat(' ')}</span>
						{contentReply.split(' ').slice(1, contentReply.length).join(' ')}
					</div>
				)}

				<div className=" flex flex-row justify-between">
					<div className="bg-very-light-gray flex flex-row justify-center items-center w-[100px] h-10 space-x-3.5 rounded-lg ">
						<button
							className="text-light-grayish-blue"
							onClick={() => {
								addLikeHandler();
							}}
							disabled={usernameReply === 'juliusomo'}
						>
							+
						</button>
						<p className="text-moderate-blue text-base font-medium">{count}</p>
						<button
							className="text-light-grayish-blue"
							onClick={() => {
								minusLikeHandler();
							}}
							disabled={usernameReply === 'juliusomo'}
						>
							-
						</button>
					</div>

					{usernameReply === 'juliusomo' ? edit ? (
						<button
							onClick={updateHandler}
							type="submit"
							className="text-base text-white  leading-6 uppercase rounded-md bg-moderate-blue pt-3 pl-[30px] pr-[30px] pb-3"
						>
							UPDATE
						</button>
					) : (
						<div className="flex items-center">
							<div className="flex items-center mr-4 cursor-pointer">
								<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
										fill="#ED6368"
									/>
								</svg>
								<h2
									className="ml-2 font-medium text-soft-red hover:text-pale-red"
									onClick={deleteWidgetHandler}
								>
									Delete
								</h2>
							</div>
							<div className="flex items-center cursor-pointer">
								<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
										fill="#5357B6"
									/>
								</svg>
								<h2
									className="ml-2 font-medium text-moderate-blue hover:text-light-grayish-blue"
									onClick={editHandler}
								>
									Edit
								</h2>
							</div>
						</div>
					) : (
						<div
							className="flex flex-row items-center text-moderate-blue cursor-pointer"
							onClick={replyHandler}
						>
							<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
									fill="#5357B6"
								/>
							</svg>
							<h2 className="ml-2 font-medium">Reply</h2>
						</div>
					)}
				</div>
			</div>
			<div className="mb-4 pl-4">
				{open ? (
					<SendComment
						buttonText={buttonText}
						idReply={idReply}
						usernameReply={usernameReply}
						createdAtReply={createdAtReply}
						imageReplie={image}
						png={png}
						webp={webp}
						scoreReply={scoreReply}
						commentReply={commentReply}
						usernameComment={usernameComment}
						idComment={idComment}
						replyingTo={replyingTo}
					/>
				) : null}
			</div>
		</main>
	);
}

export default ReplySmallScreen;
