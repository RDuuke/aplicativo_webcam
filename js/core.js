    var video = document.querySelector("#videoElement");
    var startbutton  = document.querySelector('#startbutton');
    var m_canvas = document.querySelector(".multimedia-canvas");
    var m_cam = document.querySelector(".multimedia-cam");
    var step_d = document.querySelector(".steps-container");
    var canvas  = document.querySelector('#ghospel');
    var fa = new fabric.Canvas("canvas");
    var data = [];
    var width = 744;
    var height = 560;
    var int = 0;
    var xhr = new XMLHttpRequest;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {       
	   navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
	   video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        console.log(e);
    }
    startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
    }, false);
    function takepicture (){
            
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        fa.setBackgroundImage(canvas.toDataURL(), fa.renderAll.bind(fa), {
			            originX: 'left',
			            originY: 'top',
			            left: 0,
			            top: 0
			        });
        m_cam.classList.add('display-none');
        m_canvas.classList.remove('display-none');
        m_canvas.classList.add('display-block');
        $(".st_2").removeClass("not-active");
        
    }
    
    function addpegatine(idImg, options, marc = false)
    {
        var Img = document.getElementById(idImg);
       imgInstance = new fabric.Image(Img,
						options);
        fa.add(imgInstance);
    }
    
    function removeFoto() {
   			var activeObject = fa.getActiveObject(),
        	activeGroup = fa.getActiveGroup();
	    	if (activeGroup) {
	      		var objectsInGroup = activeGroup.getObjects();
	      		fa.discardActiveGroup();
	      		objectsInGroup.forEach(function(object) {
	        		fa.remove(object);
	      		});
	    	}
	    	else if (activeObject) {
	      		fa.remove(activeObject);
	   		}
    };

    function typePrograme(name){
        $.get("_partial/"+name+".html", function(e){
                $("#content").html("");
                $("#content").html(e);
              });
    }
    
    function updateActive(current)
    {
        $(".active").removeClass('active').next().addClass('active');
    }

    function renderizeFoto()
    {
        var data = fa.toDataURL("image/jpeg");
        var photo = data.replace("image/jpeg", "image/octet-stream");
        return photo;
    }

    function navigation(opc)
    {
        console.log(opc);
        switch(opc){
            case "2":
                step_d.classList.remove('display-none');
                step_d.classList.add('display-block');
                updateActive();
                $(".this-step").html("Paso 2");
                $(".text-des").html("Selecciona el programa con el <br> que màs te identificas.");
                boxStepsDescription(false);
                break;
            case "3":
                step_d.classList.remove('display-none');
                step_d.classList.add('display-block');
                $(".this-step").html("Paso 3");
                $(".text-des").html("¿Cual mensaje te gustaría compartir?");
                typePrograme(data["programa"]);
                boxStepsDescription(false);
                updateActive();
                break;
            case "4":
                console.log(4 + "option");
                step_d.classList.remove('display-none');
                step_d.classList.add('display-block');
                $(".this-step").html("Paso 4");
                $(".text-des").html("¡Decora tu foto!");
                getPegatine(data["programa"]);
                $(".st_5").removeClass("not-active");
                boxStepsDescription(false);
                updateActive();
                break;
            case "5":

                $(".this-step").html("Paso 5");
                updateActive();
                
                $(".text-des").html("<br>¡Estamos listos!<br> <a href="+renderizeFoto()+" style='height:40px;width:40px;margin: 0 auto;' class='circle download-photo background-download display-block text-bold' download='LaFotoCaBinaATuLado' target='_blank'><img src='images/template/descargar.png' alt></a><span class='text-bold d-text'>Descargar</span>");
                step_d.classList.add('display-none');
                step_d.classList.remove('display-block');
                boxStepsDescription(true);
                break;
                
        }
    }

    function getPegatine(name){
        $.get('_partial/'+ name +'_pegatina.html', function(e){
            $("#content").html("");
            $("#content").html(e); 
        });
    }
    
    function boxStepsDescription(opc)
    {
        if(opc){
            var style_description = {
                    "background-size": "100% 100%",
                    "min-height": "165px",
                    "background-position": "11px"
            }
            
            $(".steps-description").css(style_description);
            $(".steps-description").addClass('steps-description_change');
        }else{
             var style_description = {
                    "background-size": "cover",
                    "min-height": "120px",
                    "background-position": "9px"
            }
                        
            $(".steps-description").css(style_description);
            $(".steps-description").removeClass('steps-description_change');
        }
    }
    $(document).ready(function(){
        $("#content").on("click", ".pegatina" , function(e){
            e.preventDefault();
            var img = $(this).children('img').first().attr('id');                
            addpegatine(img, {
							left:0,
							bottom:0,
							borderColor:'blue',
							cornerColor: 'blue',
                            cornerSize:10,
                            cornerStyle:'circle',
                            rotatingPointOffset: -40
						});
        $(".st_4").removeClass("not-active");
        });
        $(".removeFoto").on('click', function(e){
			e.preventDefault();
			removeFoto();
		});
        
        $(".next-menu").on('click', function(e){
            e.preventDefault();
            data["programa"]  = $(this).attr('data-id');
            fa.clear();
            addpegatine($(this).attr('data-id'), {
							left:0,
							bottom:0,
							borderColor:'blue',
							cornerColor: 'blue',
                            cornerSize:10,
                            cornerStyle:'circle',
                            rotatingPointOffset: -40,
                            hasControls: false,
                            lockMovementY:true,
                            lockMovementX:true
						});
            $(".st_3").removeClass("not-active");
        
        });

        $(".this_step_paginate").on('click', function(e){
            e.preventDefault();
            var opc = $(this).html();
            navigation(opc);
            
        });
        
       

    });