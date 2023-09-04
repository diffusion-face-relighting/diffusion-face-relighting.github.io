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
$(document).ready(function() {
  $(window).resize(function() {
    resize_op();
  });
  resize_op();

  const subjects = 16; 
  const n = 30;

  const delay = 10;
  const offset = 5;
  const sliderWidth = $("#slider_relit").width() - $("#slider_relit_circle").width() - 2 * offset;
  let animator = setTimeout(animate, delay);
  let counter = 0;
  let drag = 0;
  let show_idx = 0;
  let show_counter = 0;
  let img_size = 160;

  for (let i = 0; i < subjects; i++) {

    let page = Math.floor(i / 4);
    let page_i = i % 4;

    // console.log(show_idx, show_counter)
    $(`#relit_fig_${i}`).css("text-align", "center");

    $(`<div class='relit_io_img hide_when_small' draggable='false'>`).css(
      {
        "background-position": `${0}px ${-img_size * page_i}px`,
        // "background-position": `${0}px ${page_i / 3 * 100}%`,
        "background-image": `url('./files/content/relight/io_tile_160_${page + 1}.jpg')`
      }
    ).appendTo(`#relit_fig_${i}`);

    $(`<div id='relit_${i}' class='relit_img hide_when_small' draggable='false'>`).css(
      {
        "background-position-y": `${-img_size * page_i}px`,
        "background-image": `url('./files/content/relight/animated_tile_160_nf${n}_${page + 1}.jpg')`
      }
    ).appendTo(`#relit_fig_${i}`);
  }

  function updateImages(frame) {
    for (let i = 0; i < subjects; i++) {
      $(`#relit_${i}`).css("background-position-x", `${-img_size * frame}px`);
    }
  }

  function updateCircle(x) {
    $("#slider_relit_circle").css("left", x + "px");
    let t = (x - offset) / sliderWidth;
    let c = (1 - t) * 128 + (t) * 180;  // 0 to 180
    let c2 = (1 - t) * 180 + (t) * 128;  // 128 to 90
    $("#slider_relit_circle").css("background-color", `rgb(${c}, ${c}, ${c})`);
    $("#slider_relit_right").css("background-color", `rgb(${c2}, ${c2}, ${c2})`);
  }

  function animate() {
    let t = 0.5 * (1 + Math.sin(counter));
    updateImages(Math.floor(t * (n - 1)));
    updateCircle(t * sliderWidth + offset);
    // console.log("VALUE CHECK : " + $("#relit_ani_button").val());
    // if ($("#relit_ani_button").val() != "Pause") {
    // }
    // else {
      counter += 0.01;
    // }
    animator = setTimeout(animate, delay);
  }

  $("#relit_ani_button").click(function() {
    if ($(this).val() == "Pause") {
      $(this).val("Play");
      $(this).html("Play");
    }
    else {
      $(this).val("Pause");
      $(this).html("Pause");
    }
  });


  function updateWithEvent(e) {
    var px = e.pageX;
    if (typeof px == 'undefined') {
      px = e.touches[0].pageX;
    }
    let x = (px - $("#slider_relit").offset().left) - parseInt($("#slider_relit_circle").width()) / 2;
    if (x < offset) x = offset;
    if (x >= sliderWidth + offset) x = sliderWidth + offset - 1;
    let t = (x - offset) / sliderWidth;
    counter = Math.asin(t / 0.5 - 1);
    updateImages(Math.floor(t * (n - 1)));
    updateCircle(x);
  }

  $("#slider_relit").on('mousedown touchstart', function(e) {
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
});
