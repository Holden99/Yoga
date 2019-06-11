window.addEventListener("DOMContentLoaded", function(){
    'use strict';
    //TABS
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
        
    function hideTabContent(a){
        for (let i=a;i<tabContent.length;i++)
        {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for(let i = 0;i < tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
   
    
    // TIMER
    // конечная дата(серверб вручную)
    let deadLine = '2019-06-05';

    // узнать промежуток времени между сейчас и deadLine
    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000)%60),
            minutes = Math.floor((t/1000/60)%60),
            hours = Math.floor((t/1000/60/60));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // превращаем статичную верстку в динамическую
    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            // функция которая будет обновлять часы каждую секунду
        function updateClock(){
            let t = getTimeRemaining(endtime);
            if (t.total<0){
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            else{
                if (t.hours<10){
                    hours.textContent = '0' + t.hours;
                }
                else{
                    hours.textContent = t.hours;
                }
                if (t.minutes<10){
                    minutes.textContent = '0' + t.minutes;
                }
                else{
                    minutes.textContent = t.minutes;
                }
                if (t.seconds<10){
                    seconds.textContent = '0' + t.seconds;
                }
                else{
                    seconds.textContent = t.seconds;
                }
                
            }
           
           

            if(t.total<=0){
                clearInterval(timeInterval);
                
            }
        }
    }

     setClock('timer', deadLine);

// Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelector('.info');
        
        description.addEventListener('click', function(event){
            let target = event.target;
            if (target && target.classList.contains('description-btn')){
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            }
        });
        

        more.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function(){
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        
            
            
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
        // Contact form

    contactForm.addEventListener('submit', function(event){
        console.log(2);
        event.preventDefault();
        let request = new XMLHttpRequest;

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(contactForm);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(){
            if(request.readyState<4){
                 alert(message.loading);
            } else if(request.readyState===4 && request.status==200){
                alert(message.success);
            } else{
                alert(message.failure);
            }
        });

        for(let i=0;i<input.length;i++){
            input[i].value='';
        }
    });
    
        // модальное окно
    form.addEventListener('submit', function(event){
        // чтобы при клике на кнопку страница не перезагружалась
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest;

        request.open('POST', 'server.php');
       // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(){
            if(request.readyState<4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState===4 && request.status==200){
                statusMessage.innerHTML = message.success;
            } else{
                statusMessage.innerHTML = message.failure;
            }
        });

        for(let i=0;i<input.length;i++){
            input[i].value='';
        }
    });
    
});

