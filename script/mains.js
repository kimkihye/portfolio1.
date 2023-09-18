//헤더 메뉴
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    //btnCall에 on이 있으면 제거하고, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거하고, 없으면 추가
    menuMo.classList.toggle('on');
}


const panel = document.querySelector(".panel");
const nexts = document.querySelector(".nexts");
const prevs =  document.querySelector(".prevs");
const natus = document.querySelector(".natus");
//마지막 li를 때어서 맨 앞으로 붙여서 1부터 슬라이드가 시작되도록
panel.prepend(panel.lastElementChild);

nexts.addEventListener("click",(e)=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        
    panel.style.transition = "margin-left 0.5s";
    panel.style.marginLeft = "-50%";

    //슬라이더 순환이 되기 위한 코드
    panel.addEventListener("transitionend",()=>{
        panel.append(panel.firstElementChild);        
        panel.style.transition = "none";
        panel.style.marginLeft = "-25%";
        enableClick = true;
    }, {once : true});

    }
});

prevs.addEventListener("click",(e)=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        panel.style.transition = "margin-left 0.5s";
        panel.style.marginLeft = "0%";

        //슬라이더 순환이 되기 위한 코드
        panel.addEventListener("transitionend",()=>{
            panel.prepend(panel.lastElementChild);        
            panel.style.transition = "none";
            panel.style.marginLeft = "-25%";
            enableClick = true;
        }, {once : true});
    }
});

window.addEventListener("scroll",()=>{
    let scroll = window.scrollY || window.pageYOffset
    || document.documentElement.scrollTop;
    if(scroll >= 1200 && scroll < 2000){
        natus.style.left = `${scroll -1200}px`;
    }else if(scroll <= 1200){
        natus.style.left = `-10px`;
    }
})


//서클슬라이더
const slider_ul = document.querySelector("#slider ul");
const sliders = slider_ul.children;
const lis = slider_ul.querySelectorAll("li");


const btns = document.querySelector(".btns");
const [prev, next] = btns.children;
const pop = document.querySelector(".pop");
const close = pop.querySelector(".close");
const opens = slider_ul.querySelectorAll("a");

let enableClick = true;

for (let i = 0; i < 3; i++) { slider_ul.prepend(slider_ul.lastElementChild); }

prev.addEventListener("click", () => {
    if(enableClick){
        enableClick = false;
        slider_ul.prepend(slider_ul.lastElementChild);
        for(let el of sliders) el.classList.remove("on");
        sliders[3].classList.add("on");
        setTimeout(()=>{
            enableClick = true;
        }, 500);
    }

})

next.addEventListener("click", () => {
    if(enableClick){
        enableClick = false;
        slider_ul.append(slider_ul.firstElementChild);
        for (let el of sliders) el.classList.remove("on");
        sliders[3].classList.add("on");
        setTimeout(()=>{
            enableClick = true;
        }, 500);
    }
})

//opens
console.log(opens);
opens.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        let txt = e.currentTarget.closest("li").querySelector("h2").innerText;
        console.log(txt);
        pop.querySelector("h2").innerText = txt;


        pop.classList.add("on");
        e.currentTarget.classList.add("off");
        btns.classList.add("off");




    })
})

close.addEventListener("click", () => {
    pop.classList.remove("on");
    btns.classList.remove("off");
    slider_ul.querySelector("li.on a").classList.remove("off");

})




//자동슬라이드
const frame = document.querySelector("#banner");
const panels = frame.querySelectorAll(".panel li");


const len = panels.length - 1; //index의 값과 일치하도록 -1을 함
let num = 0;
let timer = null;
const interval = 5000; // 롤링 반복 시간

startRolling();



// 1. 롤링 시작기능
function startRolling () {

    active(num);
    // 언제나 1이 먼저 실행되고 2가 이후에 실행된다.
    // setInterval(()=>{}, 시간)
    // setInterval 콜백함수를 시간마다 계속 실행하도록 요청한다.
    // 단점 : 리소스 찌꺼기가 남는다.
    timer = setInterval(rolling, interval);

}


// 3. on클래스로인한 활성화 기능
function active (index) {
    // 클릭을 하는 순간 모든 panel과 btns들에 on을 일시적으로 지우고,
    // 클릭한 인덱스에 해당하는 panels인덱스와 btns인덱스에만 on을 붙인다.
    for (let el of panels) el.classList.remove("on");
    panels[index].classList.add("on");
    num = index;
    // 전역변수num을 active함수에서 함수가 실행되면서 변경된 index로
    // 전역변수num을 갱신하도록 한다.
} 

// 3-1 싱크를 맞추는 롤링함수
function rolling() {
    // 여기에서 전역변수num의 값과 len의 값을 비교해서 순환시켜준다.
    if(num < len) {
        num++;
    }else {
        num = 0;
    }
    active(num);

}

//메인
const btnOpen = document.querySelector(".btnOpen");
const aside = document.querySelector(".boxes");
const btnClose = document.querySelector(".btnClose");

let _top = aside.querySelector(".top");
let _right = aside.querySelector(".right");
let _bottom = aside.querySelector(".bottom");
let _left = aside.querySelector(".left");
let inner = aside.querySelector(".inner");

let section = document.querySelector("section");


btnOpen.addEventListener("click",(e)=>{
    e.preventDefault();

    // 1단계 main의 그림들을 사라지게 함
    section.classList.add("on");

    aside.style.display = "block";
    // 선을 그려줌 - 콜백을 이용해서 순차적으로 그려줌
    new Anim(_top,{
        prop : "width",
        value: "100%",
        duration: 500,
        callback: ()=>{
            new Anim(_right,{
                prop : "height",
                value: "100%",
                duration: 500,
                callback: ()=>{
                    new Anim(_bottom,{
                        prop : "width",
                        value: "100%",
                        duration: 500,
                        callback: ()=>{
                            new Anim(_left,{
                                prop : "height",
                                value: "100%",
                                duration: 500,
                                callback: ()=>{
                                    new Anim(inner,{
                                        prop : "opacity",
                                        value: "1",
                                        duration: 500
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

})

btnClose.addEventListener("click",(e)=>{
    e.preventDefault();

    new Anim(inner,{
        prop : "opacity",
        value: "0",
        duration: 500,
        callback: ()=>{
            // 사라질 때는 선이 한 번에 사라지도록 대신에 이너가 사라진 다음에..
            new Anim(_top,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_right,{
                prop : "height",
                value: "0%",
                duration: 500
            });
            new Anim(_bottom,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_left,{
                prop : "height",
                value: "0%",
                duration: 500,
                callback: ()=>{
                    aside.style.display = "none";
                    section.classList.remove("on");

                }
            });
        }
    })
})
