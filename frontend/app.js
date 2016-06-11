import Sinks from './sinks'
import Drivers from './drivers'
import State from './state'

document.addEventListener("DOMContentLoaded", () => {
  const load = new Promise( resolve => {
    /* this has to be an async call at some level, but the code is written
       synchronously? Wrapping in a promise to try to control possible
       asynchronousity */
    resolve(vsaq.qpageObject_.loadQuestionnaire("masterScreener"));
  })
  load.then( () => {
    // sometimes values are not loaded when this runs... try setTimeout hack
    run(vsaq.qpageObject_.questionnaire)
  })

});

function run(questionnaireEvDispatcher){
  const state   = State();
  const sinks   = Sinks(questionnaireEvDispatcher),
        drivers = Drivers(state);
  Object.keys(drivers).forEach( key => {
    drivers[key](sinks[key]);
  })
}
