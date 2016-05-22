import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/dom/ajax';

let masterTemplate;

Observable.fromEvent(document, 'DOMContentLoaded')
.subscribe( () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
});

Observable.fromEvent(goog.dom.getElement('_vsaq_submit_questionnaire'),
                      goog.events.EventType.CLICK)
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
    hideMasterButtons();
    setUpReturn();
  });
});

Observable.fromEvent(document.getElementById('return_to_master'), 'click')
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
    showMasterButtons();
  }
})

const hideMasterButtons = () => {
  goog.dom.getElement('_vsaq_submit_questionnaire').setAttribute("style", "display:none;");
  goog.dom.getElement('_vsaq_clear_questionnaire').setAttribute("style", "display:none;");
}

const showMasterButtons = () => {
  goog.dom.getElement('_vsaq_submit_questionnaire').setAttribute("style", "display:;");
  goog.dom.getElement('_vsaq_clear_questionnaire').setAttribute("style", "display:;");
}

const setUpReturn = () => {
  document.getElementById('return_to_master').setAttribute("style", "display:");
}
