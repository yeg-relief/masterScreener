import DOM from './domElements';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

const ajaxTemplate = reqBody => {
  return {
    url: '/masterSubmit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: reqBody,
    resultSelector: res => { return res.response.questionnaire; }
  }
}

export default function(questionnaireEvDispatcher) {
  const dom = DOM();
  const submit = Observable.fromEvent(dom.submitBtn, 'click')
                 .map(click => {return vsaq.qpageObject_.questionnaire.getValuesAsJson()})
                 .mergeMap( vsaqValues => {
                   const settings = ajaxTemplate(vsaqValues);
                   return Observable.ajax(settings);
                 });

  const returnToMaster = Observable.fromEvent(dom.returnBtn, 'click');

  const questionnaire = Observable.fromEvent(questionnaireEvDispatcher, 'change', args =>{
    return args.changedValues;
  })
  console.log(questionnaire);
  return {
    submit,
    returnToMaster,
    questionnaire
  }
}
