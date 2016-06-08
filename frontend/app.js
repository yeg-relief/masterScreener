import Sinks from './sinks'
import Drivers from './drivers'

document.addEventListener("DOMContentLoaded", () => {
  const load = new Promise( resolve => {
    /* this has to be an async call at some level, but the code is written
       synchronously? Wrapping in a promise to try to control possible
       asynchronousity */
    resolve(vsaq.qpageObject_.loadQuestionnaire("masterScreener"));
  })
  load.then( () => {
    run(vsaq.qpageObject_.questionnaire);
  })

});

function run(questionnaireEvDispatcher){
  const sinks   = Sinks(questionnaireEvDispatcher),
        drivers = Drivers(new Map());

  Object.keys(drivers).forEach( key => {
    drivers[key](sinks[key]);
  })
}
