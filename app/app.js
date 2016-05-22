import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/dom/ajax';

let masterTemplate;
const
submitBtn  = document.getElementById('_vsaq_submit_questionnaire'),
clearBtn   = document.getElementById('_vsaq_clear_questionnaire'),
returnBtn  = document.getElementById('return_to_master'),
masterBtns = [submitBtn, clearBtn],
resultBtns = [returnBtn];

Observable.fromEvent(document, 'DOMContentLoaded')
.subscribe( () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
});

Observable.fromEvent(submitBtn, 'click')
.subscribe( () => {
  const ajaxSettings = {
    url: '/masterSubmit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: vsaq.qpageObject_.questionnaire.getValuesAsJson(),
    resultSelector: function (res) { return res.response.questionnaire; }
  };
  Observable
  .ajax(ajaxSettings)
  .subscribe( x => {
    masterTemplate = vsaq.qpageObject_.questionnaire.getTemplate();
    vsaq.qpageObject_.questionnaire.setTemplate(x);
    vsaq.qpageObject_.questionnaire.render();
    toggleUiBtns();
  });
});

Observable.fromEvent(returnBtn, 'click')
.subscribe( () => {
  if (!masterTemplate) {
    alert('masterTemplate is falsey');
    console.log(`masterTemplate: \n ${masterTemplate}`);
  } else {
    vsaq.qpageObject_.questionnaire.setTemplate(masterTemplate);
    // Load answers from localStorage (if available).
    const storageData = vsaq.qpageObject_.readStorage_();
    if (storageData) {
      vsaq.qpageObject_.questionnaire.setValues(goog.json.parse(storageData));
    }
    vsaq.qpageObject_.questionnaire.render();
    toggleUiBtns();
  }
})

const toggleUiBtns = () => {
  toggleButtons(masterBtns);
  toggleButtons(resultBtns);
}

const toggleButtons = btns => {
  btns.forEach(e => {
    e.style.display =  e.style.display === 'none' ? '' : 'none';
  });
}
