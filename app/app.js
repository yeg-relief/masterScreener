import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/dom/ajax';
import {AsyncSubject} from 'rxjs/AsyncSubject';

const
ready       = Observable.fromEvent(document, 'DOMContentLoaded'),
submitBtn   = Observable.fromEvent(goog.dom.getElement('_vsaq_submit_questionnaire'),
                goog.events.EventType.CLICK);


const readySub = ready.subscribe( () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
  readySub.unsubscribe();
});
const submitSub = submitBtn.subscribe( () => {
  var obj = {
    url: '/masterSubmit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: vsaq.qpageObject_.questionnaire.getValuesAsJson(),
    resultSelector: function (res) { return res.response.questionnaire[0]; }
  };
  Observable
  .ajax(obj)
  .subscribe( x => {
    console.log(x);
  });
});
