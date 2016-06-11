import {Observable} from 'rxjs/Observable';
import Utils from './utils';

// HERE BE LAND OF SIDE EFFECTS
export default function(state){
  const utils = Utils();
  return{
    submit: submit$ => {
      return submit$.subscribe(
        masterResponse => {
          state.set('masterTemplate', vsaq.qpageObject_.questionnaire.getTemplate());
          vsaq.qpageObject_.questionnaire.setTemplate(masterResponse);
          vsaq.qpageObject_.questionnaire.render();
          utils.toggleUiBtns();
        }
      )
    },
    returnToMaster: return$ => {
      return return$.subscribe(
        () => {
          vsaq.qpageObject_.questionnaire.setTemplate(state.get('masterTemplate'));
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
          Object.keys(content.reducedItems).map( item => {
            if(content.reducedItems[item] instanceof vsaq.questionnaire.items.LineItem){
              verifyContent(content.change[item], content.reducedItems[item], state, utils);
            } else if(content.reducedItems[item] instanceof vsaq.questionnaire.items.RadioItem){
              if(content.change[item] === ""){
                clearChildren(content.change[item], content.reducedItems[item], state, utils);
              }
            }
          });
        }
      )
    }
  }
}

function clearChildren(change, item, state, utils){
  const children = state.findChildren(item.id);
  const newChanges = {};
  children.map( child => {
    const childItem = vsaq.qpageObject_.questionnaire.items_[child];
    if(childItem instanceof vsaq.questionnaire.items.LineItem){
      Object.assign(newChanges, clearLine(childItem, state, utils));
    } else if(childItem instanceof vsaq.questionnaire.items.RadiogroupItem){
      Object.assign(newChanges, clearRadio(childItem));
    }
  })
  console.log(newChanges);
  updateStorage(newChanges);
}

// not working
function clearRadio(item){
  let changes = {};
  const id = item.id;
  item.containerItems.map( radio => {
    radio.radioButton.checked = false;
    changes[id] = "";
  })
  return changes;
}



function clearLine(item, state, utils){
  if(item.getValue() === ""){
    return;
  }
  item.setInternalValue("");
  state.set(item.id, 'valid');
  toggleHighlight(item, state);
  if(state.valid() && !state.get('submitEnabled')){
    utils.enableSubmit();
    state.set('submitEnabled', true);
  }
  const id = item.id;
  const changes = {};
  changes[id] = "";
  return changes;
}


// lineItems should only take in numbers
function verifyContent(change, item, state, utils){
  // only digits
  if(/^[0-9]*$/.test(change)){
    state.set(item.id, 'valid');
    toggleHighlight(item, state);
    if(state.valid() && !state.get('submitEnabled')){
      utils.enableSubmit();
      state.set('submitEnabled', true);
    }
  } else {
    state.set(item.id, 'invalid');
    toggleHighlight(item, state);
    if(state.get('submitEnabled')){
      utils.disableSubmit();
      state.set('submitEnabled', false);
    }
  }
}

function toggleHighlight(item, state){
  const pElem = item.container.children[2];
  if(state.get(item.id) === 'valid'){
    item.textBox_.style.border = '';
    pElem.innerHTML = '';
  } else if(state.get(item.id) === 'invalid'){
    item.textBox_.style.border = '1px dotted red';
    pElem.innerHTML = `<strong>${item.id} should only be digits.</strong>`;
  }
}

function updateStorage(data) {
  var newStorageData = null;
  var storageData = vsaq.qpageObject_.readStorage_();
  if (storageData) {
    storageData = goog.json.parse(storageData);
    goog.object.extend(storageData, data);
    newStorageData = goog.json.serialize(storageData);
  } else {
    newStorageData = goog.json.serialize(data);
  }
  console.log(newStorageData);
  vsaq.qpageObject_.storage.set('masterScreener', newStorageData);
};
