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
    }
  }
}
