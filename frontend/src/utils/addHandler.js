const addHandler = (count,likePressed,setCount,updateScoreHandler,setLikePressed,dislikePressed,setDislikePressed) => {
    if (!likePressed) {
        setCount(count + 1);
        updateScoreHandler(count + 1);
        setLikePressed(true);
    } else {
        setCount(count - 1);
        updateScoreHandler(count - 1);
        setLikePressed(false);
        if (likePressed === true && dislikePressed === true) {
            setCount(count + 1);
            setLikePressed(true);
            setDislikePressed(false);
        }
    }
};
export default addHandler;