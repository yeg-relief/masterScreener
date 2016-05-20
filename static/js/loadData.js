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
      xmlhttp.send(vsaq.qpageObject_.questionnaire.getValuesAsJson());
    }
  );
}
