import React, { FC, useState } from 'react'

interface IAppointmentForm {
    selectableServices?:string[]
    service?:string
}
export const AppointmentForm:FC<IAppointmentForm> = (props) => {
    const {selectableServices,service} = props;
    const [Appointment,setAppointment] = useState({} );
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
      </form>
    );
}
export default AppointmentForm; 