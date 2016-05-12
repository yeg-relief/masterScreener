(function () {
  document.addEventListener("DOMContentLoaded", function(event) {
    vsaq.qpageObject_.loadQuestionnaire("test");
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

  });
})();
