$(window).on("load", function () {
  commonScript.commonFn();
  commonScript.mouseWheelFn();
  commonScript.scrollFn();
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
      var swiper = new Swiper(".best-slide", {
        slidesPerView: 5,
        grid: {
          rows: 2,
        },
        // spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
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
    scrollFn() {
      const $infoSection = $(".ssam-event .info");
      const $tabLinks = $(".ssam-event nav.tab .inner a");
      const $infoSections = $('.ssam-event .info > div[class^="info"]');

      $(window)
        .on("scroll", () => {
          _scrollTop = $(window).scrollTop();

          if (_scrollTop > $(".ssam-event .info").offset().top) {
            $(".ssam-event nav.tab").addClass("fixed");
          } else {
            $(".ssam-event nav.tab").removeClass("fixed");
          }

          $infoSections.each(function (index) {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();

            // 현재 스크롤 위치가 섹션 내에 있는지 확인
            if (_scrollTop > sectionTop) {
              // 모든 탭에서 on 클래스 제거 후 현재 탭에 추가
              $tabLinks.removeClass("on").eq(index).addClass("on");
              $infoSections.eq(index).addClass("active");
            }
          });
        })
        .trigger("scroll");
    },
    resizeFn() {
      $(window)
        .on("resize", (e) => {
          console.log(window.innerWidth);
          if (window.innerWidth <= 1024) {
            $("body").removeClass("stop-scroll");
          }
        })
        .resize();
    },
  
    mouseWheelFn() {
      let prevScrollTop = 0;
      let secPosition = 0;

      $(window).on("wheel", function (e) {
        if (window.innerWidth > 1024) {
          if (_isScrolling) return;

          const currentScrollTop = $(window).scrollTop();
          const wheelDelta = e.originalEvent.deltaY;
          const direction = wheelDelta > 0 ? 1 : -1;

          if (direction === -1) {
            // 위로 스크롤
            if (secPosition === 1) {
              if ($(".ssam-event .sec.two").hasClass("active")) {
                _isScrolling = true;
                $(".ssam-event .sec.two").removeClass("active");
                $(".ssam-event .sec.one").removeClass("active");
                _tl.restart();
                setTimeout(() => {
                  _isScrolling = false;
                  secPosition = 0;
                }, 700);
              }
            } else if (secPosition === 2) {
              if ($(".ssam-event .sec.thr").hasClass("active")) {
                _isScrolling = true;
                $(".ssam-event .sec.thr").removeClass("active");
                $(".ssam-event .sec.two").removeClass("hide");
                setTimeout(() => {
                  _isScrolling = false;
                  secPosition = 1;
                }, 700);
              }
            } else if (secPosition === 3 && $(window).scrollTop() == 0) {
              if ($(".ssam-event .info").hasClass("active")) {
                _isScrolling = true;
                $("body").addClass("stop-scroll");
                $(".ssam-event .info").removeClass("active");
                setTimeout(() => {
                  secPosition = 2;
                  _isScrolling = false;
                }, 700);
              }
            }
          } else if (direction === 1) {
            // 아래로 스크롤
            if (secPosition === 0) {
              if (!$(".ssam-event .sec.one").hasClass("active")) {
                _isScrolling = true;
                _tl.kill();
                $(".ssam-event .sec.one").addClass("active");
                $(".ssam-event .sec.one .background-pack .two").removeAttr("style");
                $(".ssam-event .sec.one .background-pack .thr").removeAttr("style");
                gsap.to($(".ssam-event .sec.one .txt-pack .scene3 > p"), {
                  scale: 0.5,
                  duration: 0.7,
                  opacity: 0,
                  ease: "power2.out",
                });
                $(".ssam-event .sec.one .txt-pack .scene1 > p").removeAttr("style");
                $(".ssam-event .sec.one .txt-pack .scene2 > p").removeAttr("style");
                $(".ssam-event .sec.one .txt-pack .scene3 > p").css({ opacity: 0, transform: "scale(0.5)" });
                $(".ssam-event .sec.one *").removeClass("active hide");
                setTimeout(() => {
                  $(".ssam-event .sec.two").addClass("active");
                  secPosition = 1;
                  _isScrolling = false;
                }, 700);
              }
            } else if (secPosition === 1) {
              if ($(".ssam-event .sec.two").hasClass("active")) {
                _isScrolling = true;
                $(".ssam-event .sec.two").addClass("hide");
                setTimeout(() => {
                  $(".ssam-event .sec.thr").addClass("active");
                  secPosition = 2;
                  _isScrolling = false;
                }, 700);
              }
            } else if (secPosition === 2) {
              if ($(".ssam-event .sec.thr").hasClass("active")) {
                _isScrolling = true;
                $(".ssam-event .info").addClass("active");
                setTimeout(() => {
                  _isScrolling = false;
                  secPosition = 3;
                  $("body").removeClass("stop-scroll");
                }, 700);
              }
            }
          }

          prevScrollTop = currentScrollTop;
        }
      });
    },
  };
})();

function initFormEvents() {
  $(".main-category button").on("click", handleMainCategoryClick);
  $(".options-box2 .options button").on("click", handleSubCategoryClick);
  $(".options-box3 .options button").on("click", handleFrequencyClick);
  $("#naver-id, #custom-input").on("input", checkFormValidity);
  $('input[name="agree_copyright"], input[name="agree_portrait"]').on("change", checkAgree);
}

function checkAgree() {
  const allChecked = $('input[name="agree_copyright"]').is(":checked") && $('input[name="agree_portrait"]').is(":checked");
  $("#submitBtn").prop("disabled", !allChecked);
}

function handleMainCategoryClick() {
  const key = $(this).data("category");
  const $subForm = $(".sub-form-group");
  const $currSubCategory = $(`.sub-form-group .sub-category .options[data-category="${key}"]`);

  $(this).addClass("active").siblings().removeClass("active");
  $subForm.addClass("active");
  $currSubCategory.addClass("active").siblings().removeClass("active");

  $(".sub-form-group .sub-category .options button").removeClass("active");
  $("#custom-input-wrapper").hide();

  checkFormValidity();
}

function handleSubCategoryClick() {
  const isCustom = $(this).hasClass("custom-input-btn");
  $(".options-box2 .options button").removeClass("active");
  $(this).addClass("active");

  if (isCustom) {
    $("#custom-input-wrapper").show();
    $("#custom-input").focus();
  } else {
    $("#custom-input-wrapper").hide();
  }

  checkFormValidity();
}

function handleFrequencyClick() {
  $(this).addClass("active").siblings().removeClass("active");
  checkFormValidity();
}

function checkFormValidity() {
  const isInputsFilled = $(".form-wrap input[required]")
    .toArray()
    .every((el) => $(el).val().trim() !== "");

  const isMainCategorySelected = $(".main-category button.active").length > 0;
  const mainKey = $(".main-category button.active").data("category");

  const isSubCategorySelected = $(`.options-box2 .options[data-category="${mainKey}"] button.active`).length > 0;

  const isFrequencySelected = $(".options-box3 .options button.active").length > 0;

  const isValid = isInputsFilled && isMainCategorySelected && isSubCategorySelected && isFrequencySelected;

  $("#nextBtn").prop("disabled", !isValid);
}

function openPopup(num) {
  $("body").addClass("stop-scroll");
  $(".popup").hide();
  $("#popup0" + num).show();
}

function closePopup(button) {
  $("body").removeClass("stop-scroll");
  $(button).closest(".popup").hide();
}
