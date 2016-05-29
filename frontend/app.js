//TODO: there is a bug: if you reset and then submit, you wont be able to return to master

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/dom/ajax';

const
submitBtn  = document.getElementById('_vsaq_submit_questionnaire'),
clearBtn   = document.getElementById('_vsaq_clear_questionnaire'),
returnBtn  = document.getElementById('return_to_master'),
masterBtns = [submitBtn, clearBtn],
resultBtns = [returnBtn],
cache = new Map();

Observable.fromEvent(document, 'DOMContentLoaded')
.subscribe( () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
});

const netCall = () => {
  const answers = vsaq.qpageObject_.questionnaire.getValuesAsJson();
  if (cache[answers]) {
    console.log(`from cached answer`);
    goToResults(cache[answers]);
    return;
  }
  const ajaxSettings = {
    url: '/masterSubmit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: answers,
    resultSelector: function (res) { return res.response.questionnaire; }
  };
  Observable
    .ajax(ajaxSettings)
    .subscribe( res => {
      console.log(`from network call`);
      goToResults(res);
      cache[answers] = res;
    });
}

const goToResults = (res) => {
  cache['masterTemplate'] = vsaq.qpageObject_.questionnaire.getTemplate();
  vsaq.qpageObject_.questionnaire.setTemplate(res);
  vsaq.qpageObject_.questionnaire.render();
  toggleUiBtns();
}

Observable.fromEvent(submitBtn, 'click')
.subscribe( () => {
  console.log(vsaq.qpageObject_.questionnaire.getValuesAsJson());
  netCall();
});

Observable.fromEvent(returnBtn, 'click')
.subscribe( () => {
  if (!cache['masterTemplate']) {
    alert('masterTemplate is falsey');
    console.log(`masterTemplate: \n ${masterTemplate}`);
  } else {
    vsaq.qpageObject_.questionnaire.setTemplate(cache['masterTemplate']);
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