import React from 'react';
import {createContainer,field,findOptions,labelFor} from './domManipulators';
import AppointmentForm from '../AppointmentForm';
describe("AppointmentForm",()=>{
    let render:any, container:HTMLDivElement,form:any
    const itRendersAsSelectBox =(comp:any,formName:string,elementName:string)=>{
        it('renders as a select box',()=>{
            render(comp);
            const elemnt = field(form(formName),elementName);
            expect(elemnt).not.toBeNull();
            expect((elemnt as HTMLElement).tagName).toEqual('SELECT');
        })
       
    }
    const itRenderAsLabel = ( comp:any,labelCtrlName:string,textContent:string) =>{
        it('render as a label',()=>{
         render(comp);
         expect(labelFor(container,labelCtrlName)).not.toBeNull();
         expect(labelFor(container,labelCtrlName)?.textContent).toEqual(textContent);
        });
     }
     const itAssignsAnIdThatMatchesTheLabelId= (comp:any, id:string) =>{
        it('id matches with label id',()=>{
            render(comp);
            const elem:HTMLInputElement  = (field(form('appointment'),id) as HTMLInputElement);
            expect(elem.id).toEqual(id);
           // expect(firstNameField().id).toEqual('firstName');
        })
    }  
   
    beforeEach(() => {
        ({ render, container } = createContainer());
         form = (id:any) => container.querySelector(`form[id="${id}"]`) as HTMLFormElement;
      });
    

    it('renders a form',()=>{
        render(<AppointmentForm/>)
        const formfound =form('appointment');
       // console.log(formfound);
       // expect(form('appointment')).not.toBeNull();
        expect(form('appointment')).not.toBeNull();
    })
    describe('service field',()=>{
        itRendersAsSelectBox(<AppointmentForm/>,'appointment','service')

        it('initially has a blank value choosen',()=>{
            render(<AppointmentForm/>);
            const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
            //console.log(selectElemnt);
            const firstItem = selectElemnt.firstChild as HTMLOptionElement;
            expect(firstItem.value).toEqual('');
        })

        it('list all salon properties',()=>{
            const selectableServices = [
                'Cut',
                'Blow-dry',
                'Cut & color',
                'Beard trim',
                'Cut & beard trim',
                'Extensions' ];

                render(<AppointmentForm selectableServices={selectableServices} />);
                const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
                const optionsNodes = Array.from(selectElemnt.childNodes);
                const renderedService =  optionsNodes.map(node=>node.textContent);
                expect(renderedService).toEqual(expect.arrayContaining(selectableServices));
            
        })
        it('pre-select the existing value',()=>{
            const services =['Cut','Blow-dry'];
            render(<AppointmentForm selectableServices={services} service="Blow-dry"></AppointmentForm>);
            const selectElemnt = field(form('appointment'),'service') as HTMLSelectElement;
            const option =findOptions( selectElemnt,'Blow-dry') as HTMLOptionElement;
            expect(option.selected).toBeTruthy();
        })
        
        itRenderAsLabel(<AppointmentForm/>,'service','Service');
        itAssignsAnIdThatMatchesTheLabelId(<AppointmentForm/>,'service');
    })

})