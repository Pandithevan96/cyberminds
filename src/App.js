import logo from './logo.svg';
import './App.css';
import { BiCheckCircle } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiCalendar } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';
import { BiNote } from 'react-icons/bi';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiRightArrowAlt} from 'react-icons/bi';
import { BiEdit } from 'react-icons/bi';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState([
    { name: 'Jane Smith', imageSrc: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male-512.png' },
    { name: 'Rosy Henna', imageSrc: 'https://cdn4.iconfinder.com/data/icons/avatar-circle-1-1/72/82-1024.png' },
    { name: 'Stephen Mark', imageSrc: 'https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/18-512.png' }
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [newComment, setNewComment] = useState('');
const [comments, setComments] = useState([
  { user: 'Jane Smith', comment: 'Thanks for assigning me on the task. We\'ll get the details ironed out.' }
]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [selectedImage, setSelectedImage] = useState(''); 
  const selectUser = (name, imageSrc) => {
    setUser((prevState) => {
      return [{ name: name, imageSrc: imageSrc }, ...prevState.filter(user => user.name !== name)];
    });
    
    setSelectedUser(name);
    setSelectedImage(imageSrc);
    setDropdownOpen(false);
  };
  const [editMode, setEditMode] = useState(-1);
  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };
  const handleEditComment = (value, index) => {
    const updatedComments = comments.map((comment, i) => (i === index ? { ...comment, comment: value } : comment));
    setComments(updatedComments);
  };
  const saveEditedComment = (index) => {
    setEditMode(-1); // Exit edit mode
  };
  return (
    <div className="App py-3">
      <div className="box rounded-4 px-3 py-1 ">
        <div className="row p-3">
          <div className="col-8 text-start"> <BiCheckCircle className='icons'/></div>
          <div className="col-2 text-end"><BiTrash className='icons'/></div>
          <div className="col-2 text-end text-danger">x</div>
        </div>
        <div className="bl mx-2">
          <h4 className='bw px-4 py-1 rounded-5 text-danger'>Flow Arrangement</h4>
          <p className='bw custxt px-4 py-1 rounded-5'><BiCalendar /> <span className='mx-2'> Dec 5, 2024 at 8:00-10 AM </span></p>
        </div>
        <div className="row p-1 sm">
          <div className="col-5 text-start my-auto d-flex align-items-center"> <BiUser className='mx-2 icons'/> <li>Assign to:</li></div>
          <div className='col-6 mx-2 rounded-5 bw py-1 px-2'>
            <div className='d-flex justify-content-around align-items-center list'>
              <img src={!selectedImage?'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male-512.png':selectedImage} width="30" height="30" alt="" />
              <li className='my-auto text-success sm '>{!selectedUser? 'Jane Smith':selectedUser}</li>
              <BiSolidDownArrow className='small2' onClick={toggleDropdown} />
            
            {dropdownOpen && (
              <ul className="dropdown-container">
                {user.map((item, index) => (
  <li key={index} onClick={() => selectUser(item.name, item.imageSrc)}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </div>
        <div className="row p-1 last sm">
          <div className="col-4 text-start my-auto d-flex align-items-center"> <BiNote className='mx-2 icons'/> <li>Note:</li></div>
          <div className='col-7 rounded-4 bw py-1 sm mx-2 '>
            <li> 098790875465 www.flowervendor.com</li>
          </div>
        </div>
        <div className="bottom p-2"></div>
        <div className="row p-3 last">
          <h6>Comments</h6>
          {comments.map((comment, index) => (
          <div className='d-flex mx-2 align-items-center '>
            <img src="https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male-512.png" width="30" height="30" alt="" />
            <div className='mx-3 my-auto sm'>
              <div className='d-flex justify-content-between '>
                <li className='text-success mt '>{comment.user}</li>
                {editMode === index ? (
          <div className='d-flex '>
            <input type="text" value={comment.comment} onChange={(e) => handleEditComment(e.target.value, index)} />
            <BiCheckCircle className='mx-1 mt text-success fs-2' onClick={() => saveEditedComment(index)} />
          </div>
        ) : (
          <div className='d-flex'>
            <BiEdit className='mx-1 mt text-danger icons' onClick={() => setEditMode(index)} />
            <BiTrash className='mx-1 mt text-danger icons' onClick={() => deleteComment(index)} />
          </div>
        )}
      </div>
              <li className='small '>{comment.comment}</li>
            </div>
          </div>
          ))}
          <div className='d-flex mx-2 my-3 align-items-center '>
            <img src="https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male-512.png" width="30" height="30" alt="" />
            <div className='position-relative'>
            <input 
  type="text" 
  className='mx-4 rounded-5 inp px-2' 
  placeholder='Write Comment' 
  value={newComment} 
  onChange={(e) => setNewComment(e.target.value)} 
/>
              <BiRightArrowAlt className='abs icons' onClick={() => {
      if (newComment.trim() !== '') {
        setComments([...comments, { user: 'New User', comment: newComment.trim() }]);
        setNewComment('');
      }
    }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;