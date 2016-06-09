import DOM from './domElements'

export default function(){
  const dom = DOM();

  const toggleButtons = btns => {
    btns.forEach(e => {
      e.style.display =  e.style.display === 'none' ? '' : 'none';
    });
  }

  const toggleUiBtns = () => {
    toggleButtons(dom.masterBtns);
    toggleButtons(dom.resultBtns);
  }

  const buildBlacklist = () => {
    const set = new Set();
    set.add('scheduleNextUpdate');
    set.add('saveTimeout');
    set.add('nextUpdateAttemptIn');
    set.add('changes');
    set.add('sendUpdate');
    set.add('isReadOnly');
    return set;
  }

  const proxyQuestionnaire = () => {
    const blackList = buildBlacklist();
    const handler = {
      get: (target, propKey, receiver) => {
        if(!blackList.has(propKey)){
          console.log('GET '+propKey);
        }
        return Reflect.get(target, propKey, receiver);
      },
      set: (target, propKey, value, receiver) => {
        if(!blackList.has(propKey)){
          console.log('SET '+propKey+'='+value);
        }
        return Reflect.set(target, propKey, value, receiver);
      }
    }

    return new Proxy(vsaq.qpageObject_, handler);
  }

  const disableSubmit = () => {
    dom.submitBtn.disabled = true;
    
  }

  const enableSubmit = () => {
    dom.submitBtn.disabled = false;
  }

  return{
    toggleUiBtns,
    proxyQuestionnaire,
    enableSubmit,
    disableSubmit
  }
}
