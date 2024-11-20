import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LikeButton(props) {
  console.log(props.id);
  const userId = localStorage.getItem("id");
  const [buttonClicked, setButtonClicked] = useState(props.id.likes || 0);
  const [liked, setLiked] = useState(props.id.likeUser.includes(userId));

  const onHandleLike = async (id) => {
    try {
      const res2 = await axios.put(`http://localhost:8080/like/${id}`, { id: userId });
      console.log(res2.data.msg);
      if (res2.data.msg === "dislike") {
        setButtonClicked(buttonClicked - 1);
        setLiked(false);
      } else {
        setButtonClicked(buttonClicked + 1);
        setLiked(true);
      }
    } catch (err) {
      console.log('error in uploading', err);
    }
  };

  return (
    <div>
      <button
        onClick={() => onHandleLike(props.id._id)}
        className="bg-gradient-to-r from-gray-900 to-black text-white font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {liked ? `❤️${buttonClicked}` : `🤍${buttonClicked}`}
      </button>
    </div>
  );
}

export default LikeButton;