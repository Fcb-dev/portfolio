var j = jQuery.noConflict();

function navbarAnimate() {
  var tabsNewAnim = j("#navbarSupportedContent");
  var selectorNewAnim = j("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  j(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  j("#navbarSupportedContent").on("click", "li", function (e) {
    j("#navbarSupportedContent ul li").removeClass("active");
    j(this).addClass("active");
    var activeWidthNewAnimHeight = j(this).innerHeight();
    var activeWidthNewAnimWidth = j(this).innerWidth();
    var itemPosNewAnimTop = j(this).position();
    var itemPosNewAnimLeft = j(this).position();
    j(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
j(document).ready(function () {
  setTimeout(function () {
    navbarAnimate();
  });
});
j(window).on("resize", function () {
  setTimeout(function () {
    navbarAnimate();
  }, 500);
});

j(document).on("click", ".navbar-toggler", function () {
  j(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    navbarAnimate();
  });
});

j("#copy_email").on("click", function () {
  const email = j(this).data("email");

  const tempInput = j("<input>");
  j("body").append(tempInput);
  tempInput.val(email).select();
  document.execCommand("copy");
  tempInput.remove();

  const toast = j("#toast");
  toast.addClass("show").fadeIn();

  setTimeout(function () {
    toast.fadeOut(function () {
      toast.removeClass("show");
    });
  }, 3000);
});

jQuery(document).ready(function (j) {
  var path = window.location.pathname.split("/").pop();

  if (path === "") {
    path = "index.html";
  }

  var target = j('#navbarSupportedContent ul li a[href="' + path + '"]');
  target.parent().addClass("active");

  setTimeout(function () {
    j(window).scrollTop(0);
  }, 0);

  j('a[href^="#"]').on("click", function (event) {
    event.preventDefault();

    var target = j(this.getAttribute("href"));
    if (target.length) {
      j("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        600
      );
    }
  });
});
