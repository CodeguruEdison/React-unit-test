import React, { FC, useState } from 'react'
import { TimeSlotTable } from './TimeSlotTable';

interface IAppointmentForm {
    selectableServices?:string[]
    service?:string
    salonOpenAt?:number 
    salonCloseAt?:number 
    today?:Date,
    availableTimeSlots?:any[]
}
export const AppointmentForm:FC<IAppointmentForm> = (props) => {
    const {selectableServices,service,availableTimeSlots} = props;
    const salonOpenAt = props.salonOpenAt === undefined ? 9 : props.salonOpenAt;
    const salonCloseAt = props.salonCloseAt === undefined ? 19 : props.salonCloseAt;
    const today = props.today ===undefined ? new Date() : props.today;
    const [Appointment,setAppointment] = useState({} );
    AppointmentForm.defaultProps = {
        availableTimeSlots: []
        
      };
    const handleChange =({target}:any) =>{
        setAppointment(appt =>({
            ...Appointment,
            [target.name]:target.value
        }));
    }
   
    return (
      <form id="appointment">
      <label htmlFor="service">Service</label>
       <select name ="service" value={service} id="service" onChange={handleChange}>
        <option/>
        {selectableServices && selectableServices.map((s:string)=>(
            <option key={s}>{s}</option>
        ))}
       </select>

       <TimeSlotTable salonOpenAt={salonOpenAt} salonCloseAt={salonCloseAt} 
       today={today} availableTimeSlots={availableTimeSlots} />
      </form>
    );
}
export default AppointmentForm; 