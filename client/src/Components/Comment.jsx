import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nature from '../assets/nature.jpg'
const Comment = ({ id }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/allcomments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem('id'),
      comment: newComment,
      noteId: id,
      useremail: localStorage.getItem('email'), // Assuming you store the user's email in localStorage
    };
    try {
      if (newComment.trim() !== '') {
        const response = await axios.post('http://localhost:8080/comment', data);
        setNewComment('');

        // Add the new comment to the comments state directly
        setComments((prevComments) => [
          ...prevComments,
          { ...response.data, useremail: data.useremail }, // Assuming the server response returns the comment data including _id
        ]);
      }
    } catch (err) {
      console.log('Error posting comment:', err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-2 lg:py-9 antialiased"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${nature})`,
      backgroundSize: "cover",
     
    }}>
      <div className="max-w-full mx-auto px-4 ">
        <div className="">
          <div className="py-2 px-4 text-black mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              id="comment"
              rows="5"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..." required
            />
          </div>
          <button
            onClick={handleAddComment}
            className="inline-flex items-center mb-2 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post comment
          </button>
        </div>
        <div className="h-52 overflow-y-auto"> {/* Fixed height and scrollable */}
          {comments.map((comment) => (
            <article key={comment._id} className="p-2 text-base bg-white rounded-lg dark:bg-gray-900 mb-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light semi-transparent background
              backdropFilter: 'blur(5px)', // Adds a blur effect to the background
              border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
            }}>
              <footer className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="User Profile"
                    />
                    {comment.useremail}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                   <div>
                      {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                {comment.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comment;
