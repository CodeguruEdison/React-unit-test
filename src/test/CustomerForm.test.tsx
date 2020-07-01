import React from 'react';
import {createContainer} from './domManipulators';
import  CustomerForm  from '../CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';




describe('customer form',() => {
     let render:any, container:HTMLDivElement, form:any;
   //  const firstNameField = () => field('firstName');//form('customer').elements.firstName;
     const field =(name:string) =>(form('customer') as  HTMLFormElement).elements.namedItem(name);
     const expectToBeInputFieldofTypeText = (formelement:any) =>{

        expect(formelement).not.toBeNull();
        expect(formelement.tagName).toEqual('INPUT');
        expect(formelement.type).toEqual('text');
    };
    const labelFor = (formElement:any) =>{
       return  container.querySelector(`label[for="${formElement}"]`);

    }
    const itRendersAsATextBox =(fieldName:string) =>{
        it('renders as textBox',()=>{
            render(<CustomerForm/>);
            expectToBeInputFieldofTypeText(field(fieldName));
        })
    }
    const itIncludesTheExistingValue =(fieldName:string,fieldValue:string) =>{
        it('includes the existing value ',()=>{
            render(<CustomerForm {...{[fieldName]:fieldValue}}/>);
            //var renderValue = <HTMLInputElement>(firstNameField()).
            const elem:HTMLInputElement  = (field(fieldName) as HTMLInputElement);
            expect(elem.value).toEqual(fieldValue);
        })
    }
    const itSubmitNewValue = (fieldName:string,value:any) =>{
        it('saves new first name when submitted', async () => {
            expect.hasAssertions();
            render(
              <CustomerForm
                {...{[fieldName]:'existingValue'}}
                 onSubmit={(props:any) =>
                  expect(props[fieldName]).toEqual(value)
                }
              />
            );
            await ReactTestUtils.Simulate.change( (field(fieldName) as HTMLInputElement), {
              target: { value: value,name:fieldName }
            } as any);
            await ReactTestUtils.Simulate.submit(form('customer'));
          });
    }
    const itRenderAsLabel = (labelCtrlName:string,textContent:string) =>{
       it('render as a label',()=>{
        render(<CustomerForm/>);
        expect(labelFor(labelCtrlName)).not.toBeNull();
        expect(labelFor(labelCtrlName)?.textContent).toEqual(textContent);
       });
    }
    const itAssignsAnIdThatMatchesTheLabelId= ( id:string) =>{
        it('id matches with label id',()=>{
            render(<CustomerForm/>);
            const elem:HTMLInputElement  = (field(id) as HTMLInputElement);
            expect(elem.id).toEqual(id);
           // expect(firstNameField().id).toEqual('firstName');
        })
    }    
     beforeEach (()=>{
        ({ render,container}= createContainer());
         form = (id:any) => container.querySelector(`form[id="${id}"]`);
     })

    it('renders a form',()=>{
       render(<CustomerForm/>);
      // expect(container.querySelector('form[id="customer"]')).not.toBeNull();
      expect(form('customer')).not.toBeNull();
    }) 
    it('renders the first name field as  a text box',()=>{
        render(<CustomerForm/>);
        const field = form('customer').elements.firstName  as HTMLElement;
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual('INPUT');
      //  console.log(field);
       // expect(field.type).toEqual('text');

    });

    describe('firstName',()=>{
        itRendersAsATextBox('firstName'); 
        itIncludesTheExistingValue('firstName','Ashley'); 
        itRenderAsLabel('firstName','First name' );
        itAssignsAnIdThatMatchesTheLabelId('firstName');
        itSubmitNewValue('firstName','firstName')
    })
    describe('lastName',()=>{
        itRendersAsATextBox('lastName'); 
        itIncludesTheExistingValue('lastName','Ashley'); 
         itRenderAsLabel('lastName','Last name' );
         itAssignsAnIdThatMatchesTheLabelId('lastName');
         itSubmitNewValue('lastName','lastName')
    })
    describe('phoneNo',()=>{
        itRendersAsATextBox('phoneNo'); 
        itIncludesTheExistingValue('phoneNo','Ashley'); 
         itRenderAsLabel('phoneNo','Phone No' );
         itAssignsAnIdThatMatchesTheLabelId('phoneNo');
         itSubmitNewValue('phoneNo','phoneNo')
    })
    
    
  //  itRenderAsLabel('firstName','First name' );
    
 
})