import React from 'react';
import { useState, useEffect } from 'react';

function SendComment({ buttonText, idComment, replyingTo, png }) {
	const [ comment, setComment ] = useState('Add comment...');
	const [ screenSize, setScreenSize ] = useState();
	const [ data, setData ] = useState();
	const [ error, setError ] = useState();
	const defaultUsername = 'juliusomo';

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setScreenSize('sm');
			} else if (window.innerWidth > 768) {
				setScreenSize('md');
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	const textAreaHandler = () => {
		setComment('');
	};
	const textAreaUserInputHandler = (e) => {
		setComment(e.target.value);
	};
	const commentSubmitHandler = async (e) => {
		if (buttonText === 'SEND' && comment.length > 0 && comment !== 'Add comment...') {
			try {
				const response = await fetch('/comments', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						content: comment,
						username: defaultUsername,
						png: '/images/avatars/image-juliusomo.png',
						webp: '/images/avatars/image-juliusomo.webp'
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
		}
		if (buttonText === 'Reply' && comment.length > 0 && comment !== 'Add comment...') {
			try {
				const response = await fetch(`http://localhost:3001/comments/${idComment}/replies`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						content: comment,
						replyingTo: replyingTo,
						username: defaultUsername,
						png: '../images/avatars/image-juliusomo.png',
						webp: '../images/avatars/image-juliusomo.webp'
					})
				});
				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.message);
				}
			} catch (err) {
				setError(err.message || 'Something went wrong');
				console.log(err);
			}
		}
		e.preventDefault();
	};

	return (
		<main className="p-4  bg-component-background rounded-lg">
			{screenSize === 'sm' ? (
				<form>
					<textarea
						onClick={textAreaHandler}
						onChange={textAreaUserInputHandler}
						value={comment}
						className="focus:outline-none border-[1px] pt-3 pl-6 h-24 mb-3.5 text-base font-normal text-grayish-blue leading-6 border-light-gray rounded-md w-[100%] resize-none"
					/>
					<div className="flex flex-row justify-between items-center">
						<div className="w-8 h-8 rounded-full">
							<img src="../images/avatars/image-juliusomo.png" alt="user-avatar" />
						</div>
						<button
							type="submit"
							onClick={commentSubmitHandler}
							className="text-base text-white  leading-6 uppercase rounded-md bg-moderate-blue pt-3 pl-[30px] pr-[30px] pb-3 hover:bg-light-grayish-blue"
						>
							{buttonText}
						</button>
					</div>
				</form>
			) : (
				<form className="flex flex-row space-x-4 items-start">
					<div className="w-10 h-10 rounded-full">
						<img src="../images/avatars/image-juliusomo.png" alt="user-avatar" />
					</div>
					<textarea
						onClick={textAreaHandler}
						onChange={textAreaUserInputHandler}
						value={comment}
						className="focus:outline-none border-[1px] pt-3 pl-6 h-24 mb-3.5 text-base font-normal text-grayish-blue leading-6 border-light-gray rounded-md w-[100%] resize-none"
					/>
					<button
						type="submit"
						onClick={commentSubmitHandler}
						className="text-base text-white  leading-6 uppercase rounded-md bg-moderate-blue pt-3 pl-[30px] pr-[30px] pb-3 hover:bg-light-grayish-blue"
					>
						{buttonText}
					</button>
				</form>
			)}
		</main>
	);
}

export default SendComment;
