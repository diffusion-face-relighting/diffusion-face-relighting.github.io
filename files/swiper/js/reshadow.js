$(document).ready(function () {
  const subjects = 64;
  const n_display = 4;
  const n = 39;
  const delay = 10;
  const offset = 5;
  const sliderWidth = $("#slider").width() - $("#slider_circle").width() - 2 * offset;
  let animator = setTimeout(animate, delay);
  let counter = 0;
  let drag = 0;
  let show_idx = 0;
  let show_counter = 0;
  let img_size = 160;

  for (let i = 0; i < subjects; i++) {

    if (show_counter < n_display){
      show_counter ++;
    }
    else{
      show_counter = 1;
      show_idx++;
    }
    // console.log(show_idx, show_counter)
    $(`#shadow_fig_${show_idx}`).append(`<div id='shadow_${i}' class='shadow_img' draggable='false'>`)
    $(`#shadow_fig_${show_idx}`).css("text-align", "center")
    $(`#shadow_${i}`).css("background-position-y", `${img_size * i}px`);
  }

  function updateImages(frame) {
    for (let i = 0; i < subjects; i++) {
      $(`#shadow_${i}`).css("background-position-x", `${-img_size * frame}px`);
    }
  }

  function updateCircle(x) {
    $("#slider_circle").css("left", x + "px");
    let t = (x - offset) / sliderWidth;
    let c = (1 - t) * 128 + (t) * 180;
    let c2 = (1 - t) * 128 + (t) * 90;
    $("#slider_circle").css("background-color", `rgb(${c}, ${c}, ${c})`);
    $("#slider_right").css("background-color", `rgb(${c2}, ${c2}, ${c2})`);
  }

  function animate() {
    let t = 0.5 * (1 + Math.sin(counter));
    updateImages(Math.floor(t * n));
    updateCircle(t * sliderWidth + offset);
    if ($("#reshadow_ani_button").val() != "Pause"){
    }
    else {
      counter += 0.01;
    }
    animator = setTimeout(animate, delay);
  }

  $("#reshadow_ani_button").click(function (){
    if ($(this).val() == "Pause") {
      $(this).val("Play");
      $(this).html("Play");
    }
    else{
      $(this).val("Pause");
      $(this).html("Pause");
      }
    });

  function updateWithEvent(e) {
    let x = (e.pageX - $("#slider").offset().left) - parseInt($("#slider_circle").width()) / 2;
    if (x < offset) x = offset;
    if (x >= sliderWidth + offset) x = sliderWidth + offset - 1;
    let t = (x - offset) / sliderWidth;
    counter = Math.asin(t / 0.5 - 1);
    updateImages(Math.floor(t * n));
    updateCircle(x);
  }

  $("#slider").mousedown(function(e) {
    drag = 1;
    clearTimeout(animator);
    updateWithEvent(e);
  });

  $(document).mouseup(function(e) {
    drag = 0;
    clearTimeout(animator);
    animator = setTimeout(animate, delay);
  });

  $(document).mousemove(function (e) {
    if (!drag) return;
    updateWithEvent(e);
  });
});
