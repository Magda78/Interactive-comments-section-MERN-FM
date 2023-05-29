const minusHandler = (dislikePressed,setCount,count,updateScoreHandler,setDislikePressed,likePressed,setLikePressed) => {
    if (!dislikePressed) {
        setCount(() => count - 1);
        updateScoreHandler(count - 1);
        setDislikePressed(true);
    } else {
        setCount(() => count + 1);
        updateScoreHandler(count + 1);
        setDislikePressed(false);

        if (likePressed === true && dislikePressed === true) {
            setCount(count - 1);
            setLikePressed(false);
            setDislikePressed(true);
        }
    }
};

export default minusHandler;