import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommentSmallScreen from './comment/comment-small-screen';
import CommentLargeScreen from './comment/comment-large-screen';

function Comment({
	idComment,
	usernameComment,
	createdAtComment,
	contentComment,
	png,
	webp,
	buttonText,
	scoreComment
}) {
	const [ screenSize, setScreenSize ] = useState('');
	dayjs.extend(relativeTime);
	const diffInDays = dayjs(createdAtComment).fromNow();

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

	return (
		<main>
			{screenSize === 'sm' ? (
				<CommentSmallScreen
					png={png}
					usernameComment={usernameComment}
					diffInDays={diffInDays}
					scoreComment={scoreComment}
					idComment={idComment}
					contentComment={contentComment}
					buttonText={buttonText}
					createdAtComment={createdAtComment}
					webp={webp}
				/>
			) : (
				<CommentLargeScreen
					png={png}
					usernameComment={usernameComment}
					diffInDays={diffInDays}
					scoreComment={scoreComment}
					idComment={idComment}
					contentComment={contentComment}
					buttonText={buttonText}
					createdAtComment={createdAtComment}
					webp={webp}
				/>
			)}
		</main>
	);
}

export default Comment;
