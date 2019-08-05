$(document).ready(function(){
	$("#mobile_nav").click(function(){
    
    //toggles nav and ensures other elements play nice too
		if($("#primary_nav").css('left') < "0px"){
			$("#primary_nav").animate({left: "0px"}, 200);
			$("#wrapper_main_content").animate({left: "150px"}, 200);
			$("#wrapper_main_content").css("overflow-y","hidden");
			$("body").css("overflow-x","hidden");
			$("#primary_nav").css("overflow-y","hidden");
		}else{
			$("#primary_nav").animate({left: "-115px"}, 200);
			$("#wrapper_main_content").animate({left: "0px"}, 200);
			$("#wrapper_main_content").css("overflow-y","hidden");
			$("body").css("overflow-x","hidden");
			
		}

	});
	 
});//end