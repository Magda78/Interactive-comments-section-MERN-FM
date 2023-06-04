import React, { useEffect, useState } from 'react';
import Comment from './comment';
import Reply from './reply';
import SendComment from './send-comment';
import Delete from './widget/delete';
import { selectOverlay } from '../features/dataSlice';
import { useSelector } from 'react-redux';

function Comments() {
	const [ data, setData ] = useState(null);
	const overlay = useSelector(selectOverlay);

	useEffect(() => {
		const defaultData = async () => {
			const res = await fetch('/comments');
			const data = await res.json();
			setData(data);
		};
		defaultData();
	}, []);
 
	const sortedComment = data?.sort((a, b) => b.score - a.score);

	return (
		<main>
			<div className="pt-8 pr-4 pb-8 pl-4 z-10 xl:pl-[355px] xl:pr-[355px] xl:pb-16 xl:pt-16">
				<div className="mb-4">
					{sortedComment?.map(item => (	
						<div key={item.id}>
							<Comment key={item.id} idComment={item.id} usernameComment={item.user.username}  createdAtComment={item.createdAt} contentComment={item.content}  scoreComment={item.score} buttonText="Reply" png={item.user.image.png} webp={item.user.image.webp}/>
							{item.replies && (
            					<div className="border-l-2 border-light-gray xl:ml-[43px]">
              						{item?.replies?.map((reply,index) => (
										<Reply key={index} idReply={reply.id} idComment={item.id} usernameReply={reply.user.username} createdAtReply={reply.createdAt} scoreReply={reply.score} png={reply.user.image.png} webp={reply.user.image.webp} contentReply={reply.content} buttonText="Reply" replyingTo={reply.user.username}  />
             					 	))}
            					</div>
							)}
						</div>	
					))}
				</div>
				<SendComment buttonText="SEND"/>
				
				{overlay ? <div className='bg-overlay z-30 w-full h-screen top-0 right-0 fixed  pl-4 pr-4 flex justify-center items-center'><Delete /></div>:null}
			</div>
		</main>
	);
								}

export default Comments;
