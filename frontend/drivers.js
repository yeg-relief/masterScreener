import {Observable} from 'rxjs/Observable';
import Utils from './utils';

export default function(store){
  const utils = Utils();
  return{
    submit: submit$ => {
      return submit$.subscribe(
        masterResponse => {
          store.set('masterTemplate', vsaq.qpageObject_.questionnaire.getTemplate());
          vsaq.qpageObject_.questionnaire.setTemplate(masterResponse);
          vsaq.qpageObject_.questionnaire.render();
          utils.toggleUiBtns();
        }
      )
    },
    returnToMaster: return$ => {
      return return$.subscribe(
        () => {
          if(!store.has('masterTemplate')){
            throw new Error('Can not find masterTemplate in memory.')
          }
          vsaq.qpageObject_.questionnaire.setTemplate(store.get('masterTemplate'));
          const storageData = vsaq.qpageObject_.readStorage_();
          if (storageData) {
            vsaq.qpageObject_.questionnaire.setValues(goog.json.parse(storageData));
          }
          vsaq.qpageObject_.questionnaire.render();
          utils.toggleUiBtns();
        }
      )
    },
    questionnaire: questionnaire$ => {
      return questionnaire$.subscribe(
        content => {
          const lineItems = gatherLineItems(content.reducedItems);
          if(lineItems.length > 0){
            lineItems.map(item => {
              if(!validateLineItem(content.change[item.id])){
                const pElem = getLineItemP(item);
                item.textBox_.style.border = '1px dotted red';
                pElem.innerHTML = 'this input only accepts numbers';
                utils.disableSubmit();
              } else {
                const pElem = getLineItemP(item);
                item.textBox_.style.border = '';
                pElem.innerHTML = '';
                utils.enableSubmit();
              }
            })
          } else {
            const radioItems = gatherRadioItems(content.reducedItems);
            if(radioItems.length > 0){
              radioItems.map(item => {
                Object.keys(vsaq.qpageObject_.questionnaire.getItems()).map( qitem => {
                  if(vsaq.qpageObject_.questionnaire.items_[qitem].conditions === item.id){
                    //console.log(vsaq.qpageObject_.questionnaire.items_[qitem].value);
                    const dependentItem = vsaq.qpageObject_.questionnaire.items_[qitem];
                    if(dependentItem.type === 'line'){
                      dependentItem.setInternalValue("");
                      vsaq.qpageObject_.questionnaire.values_[qitem] = "";
                    } else if(dependentItem.type === 'radiogroup'){
                      dependentItem.containerItems.forEach( radioItem => {
                        radioItem.radioButton.checked = false;
                        vsaq.qpageObject_.questionnaire.values_[qitem] = "";
                      })
                    }

                  }
                })
              })
            }
          }
        }
      )
    }
  }
}

function getLineItemP(lineItem){
  const maybeP = lineItem.container.children[2];
  if(maybeP.nodeName.toLowerCase() === "p"){
    return maybeP;
  }
  const children = lineItem.container.children;
  return chilren.filter(child => {return child.nodeName.toLowerCase() === "p";})
}

function gatherRadioItems(reducedItems){
  return Object.keys(reducedItems).reduce( (radioItems, currKey) => {
    if(reducedItems[currKey].type === 'radio'){
      radioItems.push(reducedItems[currKey]);
    }
    return radioItems;
  }, [])
}


function gatherLineItems(reducedItems){
  return Object.keys(reducedItems).reduce( (lineItems, currKey) => {
    if(reducedItems[currKey].type === 'line'){
      lineItems.push(reducedItems[currKey]);
    }
    return lineItems;
  }, [])
}
// lineItemValue is the value for a change
function validateLineItem(lineItemValue){
  // only digits
  return /^[0-9]*$/.test(lineItemValue);
}
