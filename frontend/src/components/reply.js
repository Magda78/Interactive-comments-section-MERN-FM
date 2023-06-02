import React, { useState, useEffect } from 'react';
import ReplySmallScreen from './comment/reply-small-screen';
import ReplyLargeScreen from './comment/reply-large-screen';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function Reply({
	idComment,
	idReply,
	usernameComment,
	usernameReply,
	commentReply,
	createdAtReply,
	contentReply,
	buttonText,
	scoreReply,
	replyingTo,
	png,
	webp
}) {
	const [ screenSize, setScreenSize ] = useState('');
	dayjs.extend(relativeTime);
	const diffInDays = dayjs(createdAtReply).fromNow();

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
			<div className="mb-4 pl-4 xl:pl-[43px]">
				{screenSize === 'sm' ? (
					<ReplySmallScreen
						diffInDays={diffInDays}
						idComment={idComment}
						idReply={idReply}
						usernameComment={usernameComment}
						commentReply={commentReply}
						createdAtReply={createdAtReply}
						contentReply={contentReply}
						buttonText={buttonText}
						scoreReply={scoreReply}
						replyingTo={replyingTo}
						png={png}
						webp={webp}
						usernameReply={usernameReply}
					/>
				) : (
					<ReplyLargeScreen
						diffInDays={diffInDays}
						idComment={idComment}
						idReply={idReply}
						usernameComment={usernameComment}
						commentReply={commentReply}
						createdAtReply={createdAtReply}
						contentReply={contentReply}
						buttonText={buttonText}
						scoreReply={scoreReply}
						replyingTo={replyingTo}
						png={png}
						webp={webp}
						usernameReply={usernameReply}
					/>
				)}
			</div>
		</main>
	);
}

export default Reply;
