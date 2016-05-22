const rx = require('rx');
export const fn = () => {return 45;}
/*
import * as RXDOM from 'rxjs-es/Rx.DOM';

function initialize() {
  loadData();
  submitListener();
}

RXDOM.ready().subscribe(initialize);
/*
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  submitListener();
});

const loadData = () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
}

const submitListener = () => {
  const sub_btn = goog.dom.getElement('_vsaq_submit_questionnaire');
  goog.events.listen(sub_btn,goog.events.EventType.CLICK,
    function() {
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", "/masterSubmit");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(vsaq.qpageObject_.questionnaire.getValuesAsJson());
    }
  );
}
*/
