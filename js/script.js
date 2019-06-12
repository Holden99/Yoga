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
       





         //Slider
    
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    
    function showSlides(n){
        if (n>slides.length){
            slideIndex = 1;
        }
        if(n<1){
            slideIndex = slides.length;
        }
        slides.forEach((item)=> item.style.display='none');
        dots.forEach((item)=>item.classList.remove('dot-active'));
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
        
    }

    function plusSlides(n){
        showSlides(slideIndex+=n);
    }

    function currentSlide(n){
        showSlides(slideIndex=n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click',function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i=0;i<=dots.length;i++){
            if(event.target.classList.contains('dot') && event.target == dots[i]){
                currentSlide(i+1);
            }
        }
    });


    // Calc


    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum =0,
        daysSum = 0, 
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function(){
            if(persons.value && restDays.value){
                personsSum =+this.value;
                total = (daysSum+personsSum)*4000;

            if(restDays.value==''){
                totalValue.innerHTML=0;
            }else{
                totalValue.innerHTML = total;
            }
            }else totalValue.innerHTML=0;
            
        });

        restDays.addEventListener('change', function(){
            if(restDays.value && persons.value){
                daysSum =+this.value;
                total = (daysSum+personsSum)*4000;
    
                if(persons.value==''){
                    totalValue.innerHTML=0;
                }else{
                    totalValue.innerHTML = total;
                }
            } else totalValue.innerHTML=0;
           
        });

        place.addEventListener('change', function(){
            if(restDays.value=='' || persons.value==''){
                totalValue.innerHTML=0;
            }else{
                let a = total;
                
                totalValue.innerHTML= a*this.options[this.selectedIndex].value;
            }
        });
    });
    




