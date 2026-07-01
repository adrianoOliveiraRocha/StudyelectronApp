'use strict'

const Helper = (function() {
  return {
    simpleGetAjax(url, container) {
      let xhr = new XMLHttpRequest();
    
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
          container.innerHTML = xhr.response;
        } else {
          container.innerHTML = '<div class="spinner-border text-primary"></div>';
        }
      }
    
      xhr.open('GET', url, true);
      xhr.send();
    },
    
    simplePostAjax(form, container) {
      let xhr = new XMLHttpRequest();
      let formData = new FormData(form)
      if(container) {
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4 && xhr.status == 200) {
            container.innerHTML = xhr.response;
          } else {
            container.innerHTML = '<div class="spinner-border text-primary"></div>'
          }
        }
      } else {
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.response);
            alert(result.msg);
          } else {
            console.log('Waiting...');
          }
        }
      }      
    
      xhr.open("POST", form.getAttribute('action'), true);
      xhr.send(formData);
    },

    formatCNPJ(event, str) {
      //XX.XXX.XXX/0001-XX
      if(event.which != 8) {
        if(str.length == 2) {
          document.getElementById('cnpj').value = str + '.';
        } else if(str.length == 3 && !str.split('').includes('.')) {
          let nStr = str.slice(0, 2);
          nStr+='.';
          nStr+=str[2];
          document.getElementById('cnpj').value = nStr;
        }

        if(str.length == 6) {
          document.getElementById('cnpj').value = str + '.';
        } else if(str.length == 7 && str.split('')[6] != '.') {
          let nStr = str.slice(0, 6);
          nStr+='.';
          nStr+=str[6];
          document.getElementById('cnpj').value = nStr;
        }

        if(str.length == 10) {
          document.getElementById('cnpj').value = str + '/';
        } else if(str.length == 11 && str.split('')[10] != '/') {
          let nStr = str.slice(0, 10);
          nStr+='/';
          nStr+=str[10];
          document.getElementById('cnpj').value = nStr;
        }

        if(str.length == 15) {
          document.getElementById('cnpj').value = str + '-';
        } else if(str.length == 16 && str.split('')[15] != '-') {
          let nStr = str.slice(0, 15);
          nStr+='-';
          nStr+=str[15];
          document.getElementById('cnpj').value = nStr;
        }

        if(str.length > 18) {
          let nStr = str.slice(0, 18);
          document.getElementById('cnpj').value = nStr;
        }
      }                
    },

    formatPhone(event, str) {
      if(event.which != 8) {
        if(str.length == 2) {
          let nStr = '(' + str + ')';
          console.log(nStr)
          document.getElementById('phone').value = nStr; 
        } else if(str.length == 4 && str.split('')[3] != ')') {
          let nStr = str.slice(0, 3);
          nStr+=')', nStr+=str[3];
          document.getElementById('phone').value = nStr;
        }
      }      
    }
    
  }
})();