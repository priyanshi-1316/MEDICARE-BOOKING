import React from 'react';

import { BASE_URL } from '../../config.js';
import Loading from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import DoctorCard  from './../../components/Doctors/DoctorCard.jsx';
import usefetchData from '../../hooks/usefetchData.jsx';

const MyBookings = () => {
  
  const {data:appointments, loading, error} = usefetchData(`${BASE_URL}/users/appointments/my-appointments`);
  console.log(appointments, "userdata");

  return (
    <div>
      {loading && !error && <Loading/>}

      {error && !loading && <Error errMessage={error}/>}

      {
        !loading && !error && (<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {
            appointments.map(doctor=> (<DoctorCard doctor={doctor} key={doctor._id} />))
          }
          </div>

        )}
          {!loading && !error && appointments.length===0 && (<h2 className='mt-5 text-center text-headingColor leading-7'>You did not book any doctor yet!

          </h2>
          )}
         </div>
  );
};

export default MyBookings;