//헤더 메뉴
//변수설정
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

//이벤트 바인딩

//btnCall을 클릭할때

btnCall.onclick = function(e){
    //링크이동금지
    e.preventDefault();

    //btnCall에 on이 있으면 제거하고, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거하고, 없으면 추가
    menuMo.classList.toggle('on');
}

//992c3fa35a12c362af0414f562a235f7
var container = document.getElementById('#map'); //지도를 담을 영역의 DOM 레퍼런스
//교통정보를 보게하는 버튼
const t_on = document.querySelectorAll(".traffic li")[0];
//교통정보를 끄게하는 버튼
const t_off = document.querySelectorAll(".traffic li")[1];

//branch버튼 
const branch_btns = document.querySelectorAll(".branch li");


var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.4868302, 126.7829877), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.4868302, 126.7829877); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);




t_on.addEventListener("click",(e)=>{
    e.preventDefault();
    // 지도에 교통정보를 표시하도록 지도타입을 추가합니다

    //조건문으로 on클래스가 있는지 없는지를 판별해서
    //있으면 return으로 이벤트를 막아줍니다
    if(t_on.classList.contains("on")) return;

map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    

t_on.classList.add("on");
t_off.classList.remove("on");

  
})

t_off.addEventListener("click",(e)=>{
    e.preventDefault();
    // 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
    if(t_off.classList.contains("on")) return;
map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 

t_off.classList.add("on");
t_on.classList.remove("on");
})

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);