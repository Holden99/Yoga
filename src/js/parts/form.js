function form(){
     // Form
     let message = {
        loading: 'Загрузка...',
        success:'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contactForm = document.getElementById('form');

        statusMessage.classList.add('status');

        function sendForm(elem){
 
                elem.addEventListener('submit', function (event) {
                    event.preventDefault();
                    elem.appendChild(statusMessage);
                
                    let formData = new FormData(elem);
                    let obj = {};
                    formData.forEach(function(value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);

                    
                function postData() {
                    return new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                        request.addEventListener('readystatechange', function(){
                            if (request.readyState === 4) {
                                if(request.status==200){
                                    resolve();
                                }    
                                else {
                                reject();
                                
                            }
                        }   
                        });
                    
                        request.send(json); 
                        });
                        
                }
                    function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }
                postData ()
                    // .then (() => statusMessage.textContent = message.loading)
                    .then (() => statusMessage.innerHTML = message.success)
                    .catch (() => statusMessage.innerHTML = message.failure)
                    .then (clearInput)
                    .then (console.log(3));
                });
            }
            sendForm(form);
            sendForm(contactForm);
       
}

module.exports = form;