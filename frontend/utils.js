import DOM from './domElements'

export default function(){
  const dom = DOM();

  const toggleButtons = btns => {
    btns.forEach(e => {
      e.style.display =  e.style.display === 'none' ? '' : 'none';
    });
  }

  const toggleUiBtns = function(){
    toggleButtons(dom.masterBtns);
    toggleButtons(dom.resultBtns);
  }

  return{
    toggleUiBtns
  }
}
