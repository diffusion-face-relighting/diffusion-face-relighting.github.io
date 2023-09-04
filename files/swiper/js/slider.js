function resize_op() {
  if ($(window).width() < 780) {
    $(".hide_when_small").hide();
    $(".show_when_small").show();
  } else {
    $(".hide_when_small").show();
    $(".show_when_small").hide();
  }

  // let w = $(window).width();
  // var sc = 1;
  // if (w < 780)
    // sc = w / 780;
  // $(".relit_io_img").width(480 * sc);
  // $(".relit_io_img").height(160 * sc);
  // $(".relit_img").width(160 * sc);
  // $(".relit_img").height(160 * sc);
  // $(".relit_img").css("background-size", 2400 * sc + "px");
}

function setup_slider(top_div_id, folder) {
  const subjects = 16; 
  const n = 20;

  const delay = 10;
  const offset = 5;
  const sliderWidth = $(`#${top_div_id} .slider`).width() - $(`#${top_div_id} .slider_circle`).width() - 2 * offset;
  let animator = setTimeout(animate, delay);
  let counter = 0;
  let drag = 0;
  let show_idx = 0;
  let show_counter = 0;
  let img_size = 160;

  
  let cont = $(`#${top_div_id} .inner-content`);

  const pages = 4;
  const results_per_page = 4;

  for (let i = 0; i < pages; i++) {
    let newpage = $(`<div class="card swiper-slide">`);
    newpage.append($(`<img class="show_when_small" src='/files/content/${folder}/${i+1}.jpg'>`));

    for (let j = 0; j < results_per_page; j++) {
      newpage.append(
        $(`<div class="row-gg g-0" style="text-align: center">`).append(
          $(`<div style="display: inline-block">`).append(
            $(`<div class="swiper_input hide_when_small" style="display: inline-block">`).css({
              "background-position": `${0}px ${-img_size * j}px`,
              "background-image": `url('./files/content/${folder}/${i + 1}.jpg')`
            }),
            $(`<div class='animated animated_${i * results_per_page + j} hide_when_small' draggable='false'>`).css({
              "background-position-y": `${-img_size * j}px`,
              "background-image": `url('./files/content/${folder}/nf${n}_${i + 1}.jpg')`
            })
          )
        )
      );
    }
    cont.append(newpage);
  }

  function updateImages(frame) {
    $(`#${top_div_id} .swiper-slide-active .animated`).css("background-position-x", `${-img_size * frame}px`);
  }

  function updateCircle(x) {
    $(`#${top_div_id} .slider_circle`).css("left", x + "px");
    let t = (x - offset) / sliderWidth;
    let c = (1 - t) * 128 + (t) * 180;  // 0 to 180
    let c2 = (1 - t) * 180 + (t) * 128;  // 128 to 90
    $(`#${top_div_id} .slider_circle`).css("background-color", `rgb(${c}, ${c}, ${c})`);
    $(`#${top_div_id} .slider_right`).css("background-color", `rgb(${c2}, ${c2}, ${c2})`);
  }

  function animate() {
    let t = 0.5 * (1 + Math.sin(counter));
    updateImages(Math.floor(t * (n - 1)));
    updateCircle(t * sliderWidth + offset);
    if ($(`#${top_div_id} .slider_toggle i`).hasClass("fa-pause")) {
      counter += 0.01;
      animator = setTimeout(animate, delay);
    }
  }

  $(`#${top_div_id} .slider_toggle`).click(function() {
    let ic = $(this).find("i");
    if (ic.hasClass("fa-pause")) {
      ic.removeClass("fa-pause");
      ic.addClass("fa-play");
    } else {
      ic.addClass("fa-pause");
      ic.removeClass("fa-play");
    }
  });

  function updateWithEvent(e) {
    var px = e.pageX;
    if (typeof px == 'undefined') {
      px = e.touches[0].pageX;
    }
    let x = (px - $(`#${top_div_id} .slider`).offset().left) - parseInt($(`#${top_div_id} .slider_circle`).width()) / 2;
    if (x < offset) x = offset;
    if (x >= sliderWidth + offset) x = sliderWidth + offset - 1;
    let t = (x - offset) / sliderWidth;
    counter = Math.asin(t / 0.5 - 1);
    updateImages(Math.floor(t * (n - 1)));
    updateCircle(x);
  }

  $(`#${top_div_id} .slider`).on('mousedown touchstart', function(e) {
    drag = 1;
    clearTimeout(animator);
    updateWithEvent(e);
    e.preventDefault(); 
  });

  $(document).on('mouseup touchend', function(e) {
    drag = 0;
    clearTimeout(animator);
    animator = setTimeout(animate, delay);
    e.preventDefault(); 
  });

  $(document).on('mousemove touchmove', function(e) {
    if (!drag) return;
    updateWithEvent(e);
    e.preventDefault(); 
  });
}

$(document).ready(function() {
  setup_slider("sec_relight", "relight");
  setup_slider("sec_shadow", "shadow");
  $(window).resize(function() {
    resize_op();
  });
  resize_op();
});
