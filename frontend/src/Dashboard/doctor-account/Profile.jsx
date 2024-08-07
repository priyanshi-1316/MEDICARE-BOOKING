import React, { useState } from 'react'

const Profile = () => {
   
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        bio:'',
        gender:'',
        ticketPrice:null,
        qualifications:[],
        experiences:[],
        timeSlots:[],

    });

    const handleInputChange = e=>{
        setFormData({... formData})
    };

  return (
    <div>
        <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>Profile Information</h2>

        <form> 
            <div className='mb-5'>
            <p className='form__label'>Name*</p>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="form__input"/>
            </div>

            <div className='mb-5'>
            <p className='form__label'>Email*</p>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form__input" readOnly aria-readonly disabled="true"/>
            </div>

            <div className='mb-5'>
            <p className='form__label'>Phone*</p>
            <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" className="form__input"/>
            </div>

            <div className='mb-5'>
            <p className='form__label'>Phone*</p>
            <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" className="form__input" maxLength={100}/>
            </div>

            <div className='mb-5'>
                <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                    <p className='form__label'>Gender*</p>
                    <select name='gender' value={formData.gender} onChange={handleInputChange} className='form__input py-3.5'>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className='mb-5'>
                <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                    <p className='form__label'>Specialization*</p>
                    <select name='specialization' value={formData.specialization} onChange={handleInputChange} className='form__input py-3.5'>
                        <option value="">Select</option>
                        <option value="surgeon">Surgeon</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="dermatologist">Dermatologist</option>
                    </select>
                    <div>
                        <p className='form__label'>Ticket Price*</p>
                        <input type="number" placeholder='100' name="ticketPrice" value={formData.ticketPrice} className='form__input'/>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
};

export default Profile;