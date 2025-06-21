$(window).on("load", function () {
  commonScript.commonFn();
  commonScript.alertFn();
  commonScript.resizeFn();
});

let _tl;
let _scrollTop = $(window).scrollTop();
let _isScrolling = false;

const commonScript = (function () {
  return {
    popupFn: function () {
      initFormEvents();
    },
    commonFn: function () {
      let mySwiper = null;

function initSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 720 && mySwiper === null) {
    mySwiper = new Swiper(".best-slide .swiper", {
     slidesPerView: 5,
     // spaceBetween: 20,
      grid: {
        rows: 2,
      },
      navigation: {
      nextEl: ".best-slide .swiper-button-next",
        prevEl: ".best-slide .swiper-button-prev",
      }
    });
  } else if (screenWidth < 720 && mySwiper !== null) {
    mySwiper.destroy(true, true);
    mySwiper = null;
  }
}

// 초기 실행
initSwiper();

// 리사이즈 대응
window.addEventListener("resize", () => {
  initSwiper();
});

      // 파일 첨부 버튼 클릭 시 input 클릭
  $('#fileBtn').on('click', function () {
    $('#fileInput').click();
  });

  // 파일 선택 시 파일명 표시
  $('#fileInput').on('change', function () {
    const fileName = $(this).prop('files')[0]?.name || '파일명.jpg';
    $('#fileName').text(fileName);
  });

  // 확인 버튼 클릭 시 입력 여부 검사
  $('#submitBtn').on('click', function () {
    const linkValue = $('#linkInput').val().trim();
    const fileValue = $('#fileInput').val();

    if (linkValue === '' && fileValue === '') {
      alert('인증링크 또는 이미지 중 하나는 첨부해야 합니다.');
    } else {
      alert('제출되었습니다!');
      // 여기서 실제 전송 로직 추가하면 됨
    }
  });
    },
    alertFn(){

  // 커스텀 alert 열기 함수
  function showAlert(message) {
    $("#alert .popup-box p").text(message); // 메시지 변경
    openPopup("alert"); // alert 팝업 열기
  }

  // 1, 2) heart-btn: 토글형
$(".heart-btn").on("click", function () {
  const $btn = $(this);
 const $countEl = $btn.closest(".flex--c").find(".count"); // 부모 기준으로 count 찾기
  let count = parseInt($countEl.text(), 10); // 현재 숫자

  if (!$btn.hasClass("active")) {
    $btn.addClass("active");
    $countEl.text(count + 1); // +1
    showAlert("투표가 완료되었습니다.");
  } else {
    $btn.removeClass("active");
    $countEl.text(Math.max(0, count - 1)); // 0보다 작아지지 않게
    showAlert("투표가 취소되었습니다.");
  }
});
  // 3) write-btn
  $(".write-btn").on("click", function () {
    showAlert("댓글 작성이 완료되었습니다.");
  });

  // 4) sns-btn
  $(".sns-btn").on("click", function () {
    showAlert("제출이 완료되었습니다.");
  });

  $('.com-btn').on("click", function(){
   let target=  $('#sec3').offset().top ;
    $('html, body').animate({scrollTop: target})
  })
    },
  
    resizeFn() {
      $(window)
        .on("resize", (e) => {
         
        })
        .resize();
    },
  
   
  };
})();


function openPopup(id) {
  $("body").addClass("fixed");
  $(".popup").hide();
  $("#" + id).show();
}

function closePopup(button) {
  $("body").removeClass("fixed");
  $(button).closest(".popup").hide();
}
