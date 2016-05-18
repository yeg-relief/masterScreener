(function () {
  document.addEventListener("DOMContentLoaded", function(event) {
    loadData();
    submitListener();
  });
})();

var loadData = function() {
  vsaq.qpageObject_.loadQuestionnaire("test");
}

var submitListener = function() {
  var sub_btn = goog.dom.getElement('_vsaq_submit_questionnaire');
  goog.events.listen(sub_btn,goog.events.EventType.CLICK,
    function() {
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", "/submit_handler");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(scrubData());
    }
  );
}

var scrubData = function() {
  var rawObject = JSON.parse(vsaq.qpageObject_.questionnaire.getValuesAsJson());
  console.log(rawObject);
  var sendObject = {};

  if (rawObject.age !== "") {
    sendObject.age = rawObject.age;
  }

  if (rawObject.income !== "") {
    sendObject.income = rawObject.income;
  }

  if (rawObject.has_children_no === "" && rawObject.has_children_yes === "checked") {
    var children = [];
    children.push(rawObject.one_child);
    children.push(rawObject.two_children);
    children.push(rawObject.three_children);
    children.push(rawObject.four_children);
    children.push(rawObject.five_children);

    var length = children.length;
    for(var i = 0; i < length; ++i) {
      if (children[i] === "checked") {
        sendObject.numberChildren = i;
      }
    }
  }

  if (rawObject.single_parent_yes === "checked" && rawObject.single_parent_no === "") {
    sendObject.singleParent = true;
  } else if (rawObject.single_parent_yes === "" && rawObject.single_parent_no === "checked") {
    sendObject.singleParent = false;
  } else {
    throw new Exception('single parent error');
  }
}

/*
var submitListener = function() {
  var sub_btn = goog.dom.getElement('_vsaq_submit_questionnaire');
  goog.events.listen(sub_btn,goog.events.EventType.CLICK,
    function() {
      console.log(vsaq.qpageObject_.questionnaire.getValuesAsJson())
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", "/submit_handler");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(vsaq.qpageObject_.questionnaire.getValuesAsJson());
    }
  );
}
*/
