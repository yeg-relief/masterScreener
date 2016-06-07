import Sinks from './sinks'
import Drivers from './drivers'

document.addEventListener("DOMContentLoaded", () => {
  vsaq.qpageObject_.loadQuestionnaire("masterScreener");
  run();
});

function run(){
  const sinks    = Sinks(),
        drivers = Drivers(new Map());

  Object.keys(drivers).forEach( key => {
    drivers[key](sinks[key]);
  })
}
