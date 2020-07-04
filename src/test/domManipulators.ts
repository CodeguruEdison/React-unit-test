
import  ReactDOM  from 'react-dom';

export const createContainer =()=>{
     const container = document.createElement('div');
     return {
         render:(component:any) => ReactDOM.render(component,container),
         container
     }
}
export const field =(form:HTMLFormElement,elemtName:string) =>form.elements.namedItem(elemtName);

export const findOptions = (dropdownNode:HTMLSelectElement,textContent:string) =>{
    const options = Array.from(dropdownNode.childNodes)
    return options.find(option=>option.textContent === textContent);
}
export const labelFor = (container:HTMLDivElement, formElement:any) =>{
    return  container.querySelector(`label[for="${formElement}"]`);

 }
 