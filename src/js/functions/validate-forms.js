import JustValidate from 'just-validate';
import Inputmask from "inputmask";

export const validateForms = (selector, rules, afterSend) => {
  const forms = document.querySelectorAll(selector);

  if (!forms || forms.length === 0) {
    console.error('Нет таких форм!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  forms.forEach((form) => {
    const telSelector = form.querySelector('input[type="tel"]');
  
    if (telSelector) {
      const inputMask = new Inputmask('+7 (999) 999-99-99');
      inputMask.mask(telSelector);
  
      for (let item of rules) {
        if (item.tel) {
          item.rules.push({
            rule: 'function',
            validator: function() {
              const phone = telSelector.inputmask.unmaskedvalue();
              return phone.length === 10;
            },
            errorMessage: item.telError
          });
        }
      }
    }

    const validation = new JustValidate(form);
  
    for (let item of rules) {
      validation
        .addField(item.ruleSelector, item.rules);
    }
  
    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);
  
      let xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (afterSend) {
              afterSend();
            }
            console.log('Отправлено');
          }
        }
      }
  
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
  
      ev.target.reset();
    })
  
    validation.onFail((fields) => {
      for (let field in fields) {
        if (!fields[field].isValid) {
          const input = fields[field].elem;
          if (input) {
            if (input.tagName === 'INPUT') {
              input.value = '';
            } else if (input.tagName === 'TEXTAREA') {
              input.textContent = '';
            } else if (input.tagName === 'SELECT') {
              input.selectedIndex = -1;
            }
          }
        }
      }
    });
  });
};
