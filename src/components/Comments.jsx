import { useUserValue } from '../contexts/UserContext';
import commentService from '../services/comment';
import CreateCommentForm from './CreateCommentForm';

const Comments = ({ comments, id, createComment, refreshBlog }) => {
  const user = useUserValue();

  const style = {
    marginTop: 15, marginLeft: -7
  };

  const remove = async (id) => {
    await commentService.remove(id);
    refreshBlog();
  };

  // Return null if there are no comments
  if (!comments || comments.length === 0){
    return <CreateCommentForm id={id} createComment={createComment}/>;
  }

  // Check if the first comment has a 'user' property
  const isPopulated = typeof comments[0] === 'object' && Object.prototype.hasOwnProperty.call(comments[0], 'user');

  if (isPopulated) {
    return (
      <div>
        <h2 style={style}>Comments</h2>
        <CreateCommentForm id={id} createComment={createComment}/>
        {comments.map(comment => {
          if (comment.user.id === user.id) {
            return (
              <li key={comment.id} style={{ marginLeft: 15, marginTop:5 }}>
                {comment.content} <button onClick= {() => remove(comment.id)}>delete</button>
              </li>
            );
          }else{
            return(
              <li key={comment.id} style={{ marginLeft: 15, marginTop:5 }}>
                {comment.content}
              </li>
            );
          }

        })}
      </div>
    );
  } else {
    return <p>Loading comments...</p>;
  }
};

export default Comments;