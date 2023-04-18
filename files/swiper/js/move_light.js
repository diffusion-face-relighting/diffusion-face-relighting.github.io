function getFileName(i, j, data_id) {
    return `./files/content/rotate_light/${data_id}/res_${('00' + i).slice(-2)}_${('00' + j).slice(-2)}.png`;
}

folder = ["src=65169.jpg", "src=60922.jpg", "src=63648.jpg"]
$(document).ready(function() {
    var images = [];
    let n = 10;
    for (let k = 0; k < folder.length; k++){
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
            let img = new Image();
            img.src = getFileName(i, j, folder[k]);
            images.push(img);
            }
        }
        $(`.rot_img${k+1}`).attr("src", `./files/content/rotate_light/${folder[k]}/res_00_00.png`);
        $(`.rot_vid${k+1}`).prop("playbackRate", 0.75);
    }   

    $(".video-container1").hover(
        function() { 
            $(".rot_vid1").css("display","none");
            $(".rot_img1").css("display","block");
            $(".rot_img1").mousemove(function(event){
                let x = (event.pageX - $(this).offset().left) / $(this).width();
                let y = (event.pageY - $(this).offset().top) / $(this).height();
                x = Math.round(x * (n-1));
                y = Math.round(y * (n-1));
                data_id = $(this).attr("data-id");
                if (x >= 0 && x < n && y >= 0 && y < n)
                    $(this).attr("src", getFileName(y, x, data_id));
        
            });
        },
        function() {
            $(".rot_vid1").css("display","block");
            $(".rot_img1").css("display","none");
        }
    );
    $(".video-container2").hover(
        function() { 
            $(".rot_vid2").css("display","none");
            $(".rot_img2").css("display","block");
            $(".rot_img2").mousemove(function(event){
                let x = (event.pageX - $(this).offset().left) / $(this).width();
                let y = (event.pageY - $(this).offset().top) / $(this).height();
                x = Math.round(x * (n-1));
                y = Math.round(y * (n-1));
                data_id = $(this).attr("data-id");
                if (x >= 0 && x < n && y >= 0 && y < n)
                    $(this).attr("src", getFileName(y, x, data_id));
        
            });
        },
        function() {
            $(".rot_vid2").css("display","block");
            $(".rot_img2").css("display","none");
        }
    );

    $(".video-container3").hover(
        function() { 
            $(".rot_vid3").css("display","none");
            $(".rot_img3").css("display","block");
            $(".rot_img3").mousemove(function(event){
                let x = (event.pageX - $(this).offset().left) / $(this).width();
                let y = (event.pageY - $(this).offset().top) / $(this).height();
                x = Math.round(x * (n-1));
                y = Math.round(y * (n-1));
                data_id = $(this).attr("data-id");
                if (x >= 0 && x < n && y >= 0 && y < n)
                    $(this).attr("src", getFileName(y, x, data_id));
        
            });
        },
        function() {
            $(".rot_vid3").css("display","block");
            $(".rot_img3").css("display","none");
        }
    );
});