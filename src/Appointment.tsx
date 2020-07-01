import React from 'react'

export const Appointment = ({customer}:{customer:any}) => {
    const {stylist,service,notes,firstName}=customer;
    
    return (
        <div id ="appointmentView">
        <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {firstName} {customer.lastName}
            </td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
        </div>
        )
}
export default Appointment;
