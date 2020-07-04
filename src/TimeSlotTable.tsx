import React, { FC } from 'react'
import RadioButtonIfAvailable from './RadioButtonIfAvailable';

export interface ITimeSlotTable {
    salonOpenAt:any,
    salonCloseAt:any
    today:Date,
    availableTimeSlots?:any[]
}
export  const TimeSlotTable:FC<ITimeSlotTable> = (props) => {
    TimeSlotTable.defaultProps = {
        availableTimeSlots: []
        
      };
    const dailyTimeSlots = (salonOpensAt:any, salonClosesAt:any) => {
        const totalSlots = (salonClosesAt - salonOpensAt) * 2;
        const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
        const increment = 30 * 60 * 1000;
        return Array(totalSlots)
          .fill([startTime])
          .reduce((acc, _, i) =>
            acc.concat([startTime + (i * increment)])
          );
      };
      const weeklyDateValues = (startDate:Date) => {
        const midnight = new Date(startDate).setHours(0, 0, 0, 0);
        const increment = 24 * 60 * 60 * 1000;
        return Array(7)
          .fill([midnight])
          .reduce((acc, _, i) =>
            acc.concat([midnight + (i * increment)])
          );
      };
      const toTimeValue =(timestamp:number) =>
         new Date(timestamp).toTimeString().substring(0, 5);
     const toShortDate = (timestamp:number) => {
            const [day, , dayOfMonth] = new Date(timestamp)
              .toDateString()
              .split(' ');
            return `${day} ${dayOfMonth}`;
          };
     const {salonOpenAt,salonCloseAt,today,availableTimeSlots} = props;
     const dates = weeklyDateValues(today);
     const timeSlots = dailyTimeSlots(salonOpenAt,salonCloseAt);
     const mergeDateAndTime = (date:Date,timeSlot:any) => {
        const time = new Date(timeSlot);
        return new Date(date).setHours(time.getHours(),time.getMinutes(),time.getSeconds(),time.getMilliseconds());

     };
     
    // console.log(timeSlots);
    return (
       <table id="time-slot">
            <thead>
                <tr>
                <th />
                {dates.map((d:any) => (
                    <th key={d}>{toShortDate(d)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((timeSlot:any)=>(
                    <tr key ={timeSlot}>
                        <th>{toTimeValue(timeSlot)}</th>
                        {dates && dates.map((date:any)=>(
                            <td key ={date}>
                            <RadioButtonIfAvailable
                            availableTimeSlots={availableTimeSlots}
                            date={date}
                            timeSlot={timeSlot}
                            />
                                                        
                            </td>    
                        ))}
                    </tr>
                ))}
            </tbody>
       </table>
    )
}
export default TimeSlotTable
