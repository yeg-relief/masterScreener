export default () => {
  const state = new Map();
  state.set('submitEnabled', true);
  const childMap = new Map();


  const set = (key, value) => {
    state.set(key, value)
  }

  const valid = () => {
    state.forEach( value => {
      if(value === 'invalid'){
        return false;
      }
    })
    return true;
  }

  const get = key => {
    return state.get(key);
  }

  const findChildren = id => {
    if(childMap.has(id)){
      return childMap.get(id);
    }
    const items = vsaq.qpageObject_.questionnaire.items_;

    const children = Object.keys(items).reduce( (accum, key) => {
      const item = vsaq.qpageObject_.questionnaire.items_[key];
      if(item.conditions === id){
        accum.push(key);
      }
      return accum;
    }, [])
    childMap.set(id, children);
    return childMap.get(id);
  }


  return{
    findChildren,
    get,
    set,
    valid
  }
}
