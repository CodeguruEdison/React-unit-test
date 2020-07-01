import React,{useState} from 'react'

export const CustomerForm = (props:any) => {
    const {firstName,lastName,onSubmit,phoneNo} = props;
    const [customer,setCustomer] = useState({ firstName });

   
    const handleChange =({target}:any) =>{
        setCustomer(customer =>({
            ...customer,
            [target.name]:target.value
        }));
    }
    
    return (
       <form id="customer" onSubmit={(()=>onSubmit(customer))}>
        <label htmlFor="firstName">First name</label>
        <input  type ="text" readOnly={true} id="firstName" 
        name ="firstName" value ={firstName}
        onChange ={handleChange}
        ></input>
        <label htmlFor="lastName">Last name</label>
        <input type="text" name="lastName" id="lastName" value={lastName} onChange={handleChange}></input>
        <label htmlFor="phoneNo">Phone No</label>
        <input type="text" name="phoneNo" id="phoneNo" value={phoneNo} onChange={handleChange}></input>
        <input type="submit" value="Add" />
       </form>
    )
}

export default CustomerForm;