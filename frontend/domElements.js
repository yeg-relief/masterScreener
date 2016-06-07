export default () => {
  const
  submitBtn  = document.getElementById('_vsaq_submit_questionnaire'),
  clearBtn   = document.getElementById('_vsaq_clear_questionnaire'),
  returnBtn  = document.getElementById('return_to_master'),
  masterBtns = [submitBtn, clearBtn],
  resultBtns = [returnBtn];

  return {
    submitBtn,
    clearBtn,
    returnBtn,
    masterBtns,
    resultBtns
  }
}
