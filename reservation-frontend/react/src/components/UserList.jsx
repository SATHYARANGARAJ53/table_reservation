import React, { useState, useEffect } from 'react'
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../background.jpg'
import axios from 'axios'


const UserList = () => {
  const[reserve,setreserve]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const [guest, setguest] = useState();
  const [phonenumber, setPhonenumber] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  

  //dates
  const generateDates = () => {
    const dates = [];
    //const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  const dates = generateDates();

  //time
  const generatetime = () => {
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setMinutes(Math.ceil(currentTime.getMinutes() / 30) * 30);
    const timeslots = [];

    for (let i = 0; i < 15; i++) {
      const slottime = new Date(startTime.getTime() + i * 30 * 60 * 1000); // Add 30 minutes for each slot
      timeslots.push(slottime);
    }

    return timeslots;
  };
  const timeslots = generatetime();

  //guest(no of persons)
  const generateguest = () => {
    const guests = []
    for (let i = 1; i <= 15; i++) {
      guests.push(i)
    }
    return guests
  }
  const guests = generateguest()




  //modal
  const openModal = () => {
    if (!date || !time || !guest) {
      toast.error('Please select all the fields before continuing to book.');
      return;
    }
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // ADD
  const addUser = async (e) => {
    e.preventDefault();
    if (phonenumber.length !== 10) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }
    try {
      toast.success('You reserved your seat');
      const response = await axios.post('http://localhost:3000/api', {
        date: date,
        time: time,
        guest: guest,
        phonenumber: phonenumber,
      });
      setreserve([...reserve, response.data]);
      localStorage.setItem('reservationId', response.data.id);
      setdate('');
      settime('');
      setguest('');
      setPhonenumber('');
      setIsSubmitDisabled(true);
      closeModal();
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to reserve your seat');
    }
  };
  
  //select
  const handleSelect = (value, type) => {
    if (type === 'date') {
      setdate(prevDate => (prevDate === value ? null : value));
    }
    if (type === 'time') {
      const selectedTimeSlot = timeslots.find(slot => slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === value);
      settime(prevTime => (prevTime === selectedTimeSlot ? null : selectedTimeSlot));
    }
    if (type === 'guest') {
      setguest(prevGuest => (prevGuest === value ? null : value));
    }
  };


  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', padding: '20px' }}>
      <ToastContainer />
      <div className='back' >
        <h1> Select Slot & Guests</h1>
        <div >
          <h2>Choose your Date..</h2>
          <div className="date-container">
            {dates.map((dateItem, index) => {
              const dateItemString = dateItem.toDateString();
              return (
                <div
                  key={index}
                  className={`date-item ${date === dateItemString.toString() ? 'selected' : ''}`}
                  onClick={() => handleSelect(dateItemString, 'date')}
                >
                  {dateItemString}
                </div>
              );
            })}
          </div>
          <h2>Dinning Time..</h2>
          <div className="date-container" >
            {timeslots.map((timeItem, index) => {
              const timeItemString = timeItem instanceof Date ? timeItem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
              const selectedTimeString = time instanceof Date ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
              return (
                <div
                  key={index}
                  className={`date-item ${selectedTimeString === timeItemString ? 'selected' : ''}`}
                  onClick={() => handleSelect(timeItemString, 'time')}
                >
                  {timeItemString}
                </div>
              )
            })}
          </div>
          <h2>How many Guests?</h2>
          <div className="date-container">
            {guests.map((guestItem, index) => {
              return (
                <div key={index} className={`date-item ${guest === guestItem ? 'selected' : ''}`} onClick={() => handleSelect(guestItem, 'guest')}>
                  {guestItem}
                </div>
              )
            })}
          </div><br></br>
          <button onClick={openModal} >Continue to Book</button>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Enter Your Contact Number to Book</h2>
              <form >
                <div>
                  <label>Date:</label>
                  <span>{date ? date.toString() : 'Not selected'}</span>
                </div>
                <div>
                  <label>Time:</label>
                  <span>{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected'}</span>
                </div>
                <div>
                  <label>Guests:</label>
                  <span>{guest}</span>
                </div>
                <div>
                  <label>Mobile Number:</label>
                  <input type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} maxLength="10" required />
                </div>
                <button type="submit" onClick={addUser} >Submit</button>
              </form>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default UserList