/***** GLOBAL VARIABLES *****/
var curSection=0;
var animating=false;
var isIpadBig=false;
var counterActivated=false;
var animationActivated=false;
var parallax=false;
var initWidth = $(window).width();
var initHeight = $(window).height();
var platform = navigator.platform.toLowerCase();
navigator.browserType = (function(){
	var app = navigator.appName;
	var browser = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	return (browser? browser[1]: app);
})();	

$(window).load(function(){
	$('#hideAll').css('display','none'); /* Get rid of loading cover */

	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
		TweenMax.from($("#navLogo"),2,{css:{top:1000},ease:Bounce.easeOut});
	$('#navLogo').css('position','fixed');
});

function disableScroll(){
	var scrollPosition=[self.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,self.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop];
	var html=jQuery('html');
	html.data('scroll-position',scrollPosition);
	html.data('previous-overflow',html.css('overflow'));
	window.scrollTo(scrollPosition[0],scrollPosition[1]);
};

function setScanPosition(){
	ipadMiddle=$('#actionIpad').height()/2;
	$('#beam').css('top',ipadMiddle-($('#beam').height()/2)-35);
	$('#license').css('top',ipadMiddle-($('#license').height()/2)-35);
};

window.onresize=function(event){
	if(animating)setScanPosition(); /*Set position of scan images if necessary */

	if((($(window).width() > (initWidth + 1200)) && ($(window).height() > (initHeight + 700))) || ($(window).width() + $(window).height() > 4015)) 
		$('.navbar').css('display', 'none');
	else
	{
		$('.navbar').css('display', 'block');
		setNavbar();
	}

};

function setNavbar()
{
	$('#navLogo').css('left',(($(window).width()/2)-48.6));
	$('#onBoardDropDown').css('left',20);

	switch(navigator.browserType) /*Set navigation bar based on browser&OS*/
	{
		case "Chrome":
			$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 60));
			break;
		case "Firefox":
		case "Opera":
			if(/win|linux/i.test(platform))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 35));
			else
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 60));
			break;
		case "MSIE":
			$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 70));
			break;
		case "Safari":
			if(!/Android|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 72.5));
			else if(/Android/i.test(navigator.userAgent))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 42.5));
			else if(/iPhone/i.test(navigator.userAgent))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 56));
			else if(/iPad/i.test(navigator.userAgent))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 60));
			else if(/BlackBerry/i.test(navigator.userAgent))
				$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 45));
			else
				$('.navbar').css('display', 'none');
			break;
	}

};
function validateEmail(email){
	return /^[a-zA-Z0-9].*@[a-zA-Z0-9].*\.[a-z]{1,3}/.test(email);
};
function sendEmail(){
	if($('#Ename').val()=="Name"){
		$('#Ename').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('Name must contain a value.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Email').val()=="E-mail" || !validateEmail($('#Email').val())){
		$('#Email').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('E-mail must be valid.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Ewebsite').val()=="Website"){
		$('#Ewebsite').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('Website must contain a value.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Emessage').val()=="Message"){
		$('#Emessage').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('Message must contain a value.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}

	$.ajax({
		url:"sendEmail.php",
		data:{name:$('#Ename').val(),
		email:$('#Email').val(),
		website:$('#Ewebsite').val(),
		message:$('#Emessage').val()},
		success: function(data){
			$('#emailValidation').css('color', '#56B3A6');
			$('#emailValidation').val('Your E-mail has been sent!')
			;TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		}
	});
};

function parallaxScroll(section){
	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) && ($(window).height() <= 1060) && navigator.browserType != 'MSIE' )
	{
		if(!parallax)
			parallax = true;

		var scrolled=$(window).scrollTop();
		
		switch(section){
			case 1:
				$('#titleWrap').css('margin-top',(100+(scrolled*.25))+'px');
				$('#introIpadWrap').css('top',(0-(scrolled*.2)));
				$('#hex1').css('top',(75+(scrolled-$('#onBoard').offset().top)*.1));
				$('#hex2').css('top',(750-(scrolled-$('#onBoard').offset().top)*.2));
				$('#hex3').css('top',(670-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex4').css('top',(25-(scrolled-$('#onBoard').offset().top)*.15));
				$('#hex5').css('top',(180-(scrolled-$('#onBoard').offset().top)*.2));
				$('#ipad1').css('top',(30-(scrolled-$('#onBoard').offset().top)*.3));
				$('#ipad2').css('top',(800-(scrolled-$('#onBoard').offset().top)*.3));
				break;
			case 2:
				$('#hex1').css('top',(75+(scrolled-$('#onBoard').offset().top)*.1)); 
				$('#hex2').css('top',(750-(scrolled-$('#onBoard').offset().top)*.2));
				$('#hex3').css('top',(670-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex4').css('top',(25-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex5').css('top',(180-(scrolled-$('#onBoard').offset().top)*.2));  
				$('#ipad1').css('top',(30-(scrolled-$('#onBoard').offset().top)*.3));
				$('#ipad2').css('top',(800-(scrolled-$('#onBoard').offset().top)*.3));
				if(scrolled >= 1600){
					$('#hex7').css('top',70-(scrolled-$('#onBoardFund').offset().top)*.125);
					$('#hex8').css('top',(500-(scrolled*.083)));
					$('#ipad3').css('top',100-(scrolled-$('#onBoardFund').offset().top)*.25);
					$('#fundLogo').css('zoom',(1+(scrolled - 1600)*.0003));
				}
				break;
			case 3:
				$('#hex7').css('top',70-(scrolled-$('#onBoardFund').offset().top)*.125);
				$('#hex8').css('top',(500-(scrolled*.083)));
				$('#ipad3').css('top',100-(scrolled-$('#onBoardFund').offset().top)*.25);
				
				if(scrolled >= ($('#onBoardSales').offset().top - $(window).height()))
				{
					$('#salesLogo').css('zoom',(1+(scrolled - ($('#onBoardSales').offset().top - $(window).height()))*.0003));
					$('#salesWrap').css('margin-top',180-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.2);
					$('#hex9').css('top',135-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.083);
					$('#hex10').css('top',370-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.125);
					$('#tablet').css('top',270-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.3);
					if(!animationActivated)
						$('#socialSales').css('bottom',-207+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
					else
						$('#socialSales').css('bottom',-307+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
				}
				break;
			case 4:
				$('#salesWrap').css('margin-top',180-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.2);
				$('#hex9').css('top',135-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.083);
				$('#hex10').css('top',370-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.125);
				$('#tablet').css('top',270-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.3);
				if(!animationActivated)
					$('#socialSales').css('bottom',-207+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
				else
					$('#socialSales').css('bottom',-307+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
				if(scrolled >= ($('#about').offset().top - $(window).height()))
				{
					$('#heading9').css('opacity',(scrolled-($('#about').offset().top - $(window).height()))*.0015);
					$('#aboutWrap').css('padding-top',100-(scrolled-($('#about').offset().top - $(window).height()))*.1);
				}
				break;
			case 5:
				$('#aboutWrap').css('padding-top',100-(scrolled-($('#about').offset().top - $(window).height()))*.1);
				break;
			case 6:
				$('#contactWrap').css('top', 100-(scrolled-($('#contact').offset().top - $(window).height()))*.1);
				$('#sendWrap').css('padding-top', 200-(scrolled-($('#contact').offset().top - $(window).height()))*.25);
				break;
			case 7:
				$('#contactWrap').css('top', 100-(scrolled-($('#contact').offset().top - $(window).height()))*.1);
				$('#sendWrap').css('padding-top', 200-(scrolled-($('#contact').offset().top - $(window).height()))*.25);
				$('#socialWrap').css('top', 600-(scrolled-$('#contact').offset().top)*.2);
				break;
		}
	}
	else if(parallax)
	{
		parallax = false; /*disable animations*/

		$('#titleWrap').css('margin-top', 100);
		$('#introIpadWrap').css('top',0);
		$('#hex1').css('top',75);
		$('#hex2').css('top',670);
		$('#hex3').css('top',625); 
		$('#hex4').css('top',-15);
		$('#hex5').css('top',230);
		$('#ipad1').css('top',30);
		$('#ipad2').css('top',650);
		$('#hex7').css('top',70);
		$('#hex8').css('top',300);
		$('#ipad3').css('top',100);
		$('#fundLogo').css('zoom',1);
		$('#salesLogo').css('zoom',1);
		$('#salesWrap').css('margin-top',50);
		$('#hex9').css('top',135);
		$('#hex10').css('top',370);
		$('#tablet').css('top',100);
		$('#heading9').css('opacity',1);
		$('#aboutWrap').css('padding-top',100);
		$('#contactWrap').css('top', 100);
		$('#sendWrap').css('padding-top', 200);
		$('#socialWrap').css('top', 600);

		if(!animationActivated)
			$('#socialSales').css('bottom',-207);
		else
			$('#socialSales').css('bottom',-357);
	}
};

$(document).ready(function(){	 
	browserHandler();
    
	/* <![CDATA[ */
        jQuery(document).ready(function($){$("#counter").flipCounter({formatNumberOptions:{format:"000,000",locale:"us"}});});
	/* ]]> */

	$('#quotes1 blockquote').quovolver();
	$('#quotes2 blockquote').quovolver();
	$('#quotes3 blockquote').quovolver();
	$('#quotes4 blockquote').quovolver();

	setNavbar();
	$('#intro').css('height',($(window).height()-200));
	$('#contact').css('height',$(window).height());
	$('#Emessage').val("Message");
	navigate();

	setEventListeners();
});

function browserHandler(){
	if(/win|linux/i.test(platform))
    {
       	if(navigator.browserType != 'MSIE')
       	{
	        $('body').mousewheel(function(event, delta) 
	        {
		        if (delta < 0) /* down*/
		            $(document).scrollTo('+=75px', 50 );
		        else /* up*/
		            $(document).scrollTo('-=75px', 50 );

		        return false;
	    	});

		    if(navigator.browserType == 'Chrome' )
			{
				$('h1, h2, h3, h4, h5, h6').css('-webkit-text-stroke-width', '.5px');
				$('#sticky_navigation ul li a').css('-webkit-text-stroke-width', '.5px');
				$('.langWrap p, .langWrap a, p').css('-webkit-text-stroke-width', '.9px');
				$('body').css('-webkit-text-stroke-width', '.1px');
			}
			else if(navigator.browserType == 'Firefox' || navigator.browserType == 'Opera')
			{
				$('#sticky_navigation ul li a, .langWrap p, .langWrap a').css('font-size', '16px');
				$('#sticky_navigation ul li a, .langWrap p, .langWrap a, p').css('text-shadow', '0px .1px 0');
				$('.campaignWrap a, .camInfo').css('font-size', '14px');
				$('.camInfo').css('margin-left', '0px');
				$('.camInfo').css('margin-right', '0px');
			}
	    }
	    else
	    {
	    	$('#aboutBody').css('margin-top', '-10px');
	    	$('#pressBody').css('margin-top', '-10px');
	    }
    }
    else if(navigator.browserType == 'Firefox')
	{
		$('#sticky_navigation ul li a').css('text-shadow', '0px 0px 0');
	}

	if(navigator.browserType == 'Opera')
	{
		$('#aboutBody').css('margin-top', '-10px');
		$('#pressBody').css('margin-top', '-10px');
	}
}

function setEventListeners(){
	$(window).bind('scroll',function(e){navigate();});

	$('a.intro').click(function(){$('html, body').animate({scrollTop:0},1000);});
	$('a.onboard').hover(
		function(){$('#onBoardDropDown').css('display','block');},
		function(){$('#onBoardDropDown').css('display','none');});
	
	$('#onBoardDropDown').hover(function(){$('#onBoardDropDown').css('display', 'block');},function(){$('#onBoardDropDown').css('display','none');});

	$('#dropDownFund').hover(function(){
		if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
			$('#dropDownFund').css('background-color','#46A3A6');
		else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
			$('#dropDownFund').css('background-color','#ff6161');
		else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
			$('#dropDownFund').css('background-color','#ffdc43');
		else{
			$('#dropDownFund').css('background-color','grey');
			$('#dropDownFund').css('color','lightgrey');
		}
	}, function(){
		if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
			$('#dropDownFund').css('background-color','#56B3A6');
		else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
			$('#dropDownFund').css('background-color','#FF3D3D');
		else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
			$('#dropDownFund').css('background-color','#ffcc33');
		else{
			$('#dropDownFund').css('background-color','#EFEFEF');
			$('#dropDownFund').css('color','grey');
		}
	});

	$('#dropDownSales').hover(function(){
		if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
			$('#dropDownSales').css('background-color','#46A3A6');
		else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
			$('#dropDownSales').css('background-color','#ff6161');
		else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
			$('#dropDownSales').css('background-color','#ffdc43');
		else{
			$('#dropDownSales').css('background-color','grey');
			$('#dropDownSales').css('color','lightgrey');
		}
	}, function(){
		if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
			$('#dropDownSales').css('background-color','#56B3A6');
		else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
			$('#dropDownSales').css('background-color','#FF3D3D');
		else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
			$('#dropDownSales').css('background-color','#ffcc33');
		else{
			$('#dropDownSales').css('background-color','#EFEFEF');
			$('#dropDownSales').css('color','grey');
		}
	});

	$('a.onboard').click(function(){$('html, body').animate({scrollTop:$('#onBoard').offset().top+1},1000);});
	$('#dropDownFund').click(function(){$('html, body').animate({scrollTop:$('#onBoardFund').offset().top+1},1000);});
	$('#dropDownSales').click(function(){$('html, body').animate({scrollTop:$('#onBoardSales').offset().top+1},1000);});
	$('a.about').click(function(){$('html, body').animate({scrollTop:$('#about').offset().top+1},1000);});
	$('a.press').click(function(){$('html, body').animate({scrollTop:$('#press').offset().top+1},1000);});
	$('a.contact').click(function(){$('html, body').animate({scrollTop:$('#contact').offset().top+1},1000);});

	$('#fullIpad').click(function(){
		if(!isIpadBig)
		{
			isIpadBig = true;
			TweenMax.to($('#onBoardFund'),1,{css:{height:2200}, ease:Quad.easeOut});
			TweenMax.to($('#socFundContainer'),1,{css:{top:1950}, ease:Quad.easeOut});
			TweenMax.to($('.bigIpad'),1,{css:{height:1055}, ease:Quad.easeOut});
			$('#ipadTxt').text("Click to shrink iPad back");
		}
		else
		{
			isIpadBig = false;
			TweenMax.to($('#onBoardFund'),1,{css:{height:1400}, ease:Quad.easeOut});
			TweenMax.to($('#socFundContainer'),1,{css:{top:1150}, ease:Quad.easeOut});
			TweenMax.to($('.bigIpad'),1,{css:{height:275}, ease:Quad.easeOut});
			$('#ipadTxt').text("Click to see full iPad screen");
		}
	});

	/*event listener to open/close animation section*/
	$('#arrow4').click(function(){
		
		if(!animating)
		{
			animating = true;
			if(!animationActivated)
			{
				animationActivated = true;
				$('#arrow4').css({
					'-moz-transform' : 'scaleY(-1)',
					'-o-transform' : 'scaleY(-1)',
					'-webkit-transform' : 'scaleY(-1)',
					'transform': 'scaleY(-1)'
				});
				
				$('#ipadAction').css('display', 'block');

				var newHeight;

				if($(window).height() > 1000)
					newHeight = 1000;
				else
					newHeight = $(window).height();
				
				if(navigator.browserType == "Chrome" || navigator.browserType == "Safari")
				{
					TweenMax.to($('#ipadAction'),1, {css:{height:newHeight}, ease:Quad.easeOut,
						onComplete:function(){
							TweenMax.to($('#actionWrapper'),1,{css:{opacity:1}, ease:Quad.easeOut});
							$('#actionWrap').css('height', (newHeight*.75));
							animating = false;
						}
					});
					TweenMax.to($('#socSalesContainer'),1, {css:{top:(newHeight + 98)}, ease:Quad.easeOut});
					TweenMax.to($('#quotes2'),1, {css:{'margin-top':(newHeight + 98)}, ease:Quad.easeOut});
				}
				else
				{
					$('#ipadAction').css('height', newHeight);
					TweenMax.to($('#actionWrapper'),1,{css:{opacity:1}, ease:Quad.easeOut});
					$('#actionWrap').css('height', (newHeight*.75));
					animating = false;
					$('#socSalesContainer').css('top', (newHeight + 98));
					$('#quotes2').css('margin-top', (newHeight + 98));
				}
			}
			else
			{
				animationActivated = false;
				$('#arrow4').css({
					'-moz-transform' : 'scaleY(1)',
					'-o-transform' : 'scaleY(1)',
					'-webkit-transform' : 'scaleY(1)',
					'transform': 'scaleY(1)'
				});

				if(navigator.browserType == "Chrome")
				{
					TweenMax.to($('#actionWrapper'),1,{css:{opacity:0}, ease:Quad.easeOut,
						onComplete:function(){
							TweenMax.to($('#ipadAction'),1, {css:{height:0}, ease:Quad.easeOut,
								onComplete:function(){
									$('#ipadAction').css('display', 'none');

								}
							});
							animating = false;
						}
					});
					TweenMax.to($('#socSalesContainer'),1, {css:{top:0}, ease:Quad.easeOut});
					TweenMax.to($('#quotes2'),1, {css:{'margin-top':0}, ease:Quad.easeOut});
				}
				else
				{
					TweenMax.to($('#actionWrapper'),1,{css:{opacity:0}, ease:Quad.easeOut,
						onComplete:function(){
							TweenMax.to($('#ipadAction'),1, {css:{height:0}, ease:Quad.easeOut,
								onComplete:function(){
									$('#ipadAction').css('display', 'none');

								}
							});
							TweenMax.to($('#socSalesContainer'),1, {css:{top:0}, ease:Quad.easeOut,
								onComplete: function(){
									$('#quotes2').css('margin-top', 0);
									$('#quotes2').css('top', 0);
									animating = false;
								}
							});
							TweenMax.to($('#quotes2'),1, {css:{top:-(newHeight + 98)}, ease:Quad.easeOut});
							$('#quotes2').css('margin-top', 0);
						}
					});
				}
			}
			navigate();
		}
	});

	/*event listener for swipe animation*/
	$('#radSwipe').click(function(){
		if(!animating){
			animating = true;
			$('#radSwipe').css('background-color','#FF3D3D');
			$('#radSwipe').css('width','25');
			$('#radSwipe').css('height','25');
			$('#radSwipe').css('border','10px solid #eeeeee');
			$('#actionIpad').attr('src', 'img/Electronics/ipad-before-swipe.png');

			var beep = $('#beep')[0];
			beep.volume=0.1;

			if($(window).scrollTop() <= ($('#ipadAction').offset().top - 5) || $(window).scrollTop() >= ($('#ipadAction').offset().top + 5))
				$('html, body').animate({scrollTop:$('#ipadAction').offset().top}, 1000);

			disableScroll();
			if($('#radScan').css('background-color') == 'rgb(255, 61, 61)'){
				$('#radScan').css('background-color','#F4F4F4');
				$('#radScan').css('width','30');
				$('#radScan').css('height','30');
				$('#radScan').css('border','3px solid #D0D0D0');	
			}

			TweenMax.to($('#creditCard'),0,{css:{top:'-20%',opacity:0},ease:Quad.easeOut});
			TweenMax.to($('#txtSwipe'),1,{css:{opacity:1},ease:Quad.easeOut});
			TweenMax.to($('#creditCard'),2,{css:{opacity:1},ease:Quad.easeOut,
				onComplete:function(){
					TweenMax.to($('#creditCard'),1.5,{css:{top:'45%'},ease:Power2.easeOut,
						onComplete:function(){
							TweenMax.to($('#creditCard'),2,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#txtSwipe'),1,{css:{opacity:0},ease:Quad.easeOut});
							/*un-lock scroll position*/
							var html = jQuery('html');
							var scrollPosition = html.data('scroll-position');
							html.css('overflow', html.data('previous-overflow'));

							if(navigator.browserType != "MSIE")
								beep.play();
							else
								document.getElementById('beepIE').innerHTML="<embed src='beep-8.wav' hidden=true autostart=true loop=false/>";

							animating = false;

							$('#actionIpad').attr('src', 'img/Electronics/ipad-after-swipe.png');

							$('#radSwipe').css('background-color','#F4F4F4');
							$('#radSwipe').css('width','30');
							$('#radSwipe').css('height','30');
							$('#radSwipe').css('border','3px solid #D0D0D0');
						}
					});
				} 
			});
		}
		else{
			$('#radSwipe').css('background-color','#F4F4F4');
			$('#radSwipe').css('width','30');
			$('#radSwipe').css('height','30');
			$('#radSwipe').css('border','3px solid #D0D0D0');
		}
	});

	$('#radScan').click(function(){
		if(!animating){
			animating = true;
			$('#radScan').css('background-color','#56B3A6');
			$('#radScan').css('width','25');
			$('#radScan').css('height','25');
			$('#radScan').css('border','10px solid #eeeeee');
			$('#actionIpad').attr('src', 'img/Electronics/ipad-before-scan.png');
			var beep = $('#beep')[0];
			beep.volume=0.1;
			setScanPosition();

			if($(window).scrollTop() <= ($('#ipadAction').offset().top-5) || $(window).scrollTop() >= ($('#ipadAction').offset().top + 5))
				$('html, body').animate({scrollTop:$('#ipadAction').offset().top},1000);

			disableScroll();
			if($('#radSwipe').css('background-color') == 'rgb(255, 61, 61)'){
				$('#radSwipe').css('background-color','#F4F4F4');
				$('#radSwipe').css('width','30');
				$('#radSwipe').css('height','30');
				$('#radSwipe').css('border','3px solid #D0D0D0');
			}

			TweenMax.to($('#txtScan'),1,{css:{opacity:1},ease:Quad.easeOut});
			TweenMax.to($('#license'),1.5,{css:{opacity:1},ease:Quad.easeOut,
				onComplete:function(){
					TweenMax.to($('#beam'),2,{css:{opacity:1},ease:Quad.easeOut,
						onComplete:function(){
							TweenMax.to($('#txtScan'),1,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#beam'),1.5,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#license'),1.5,{css:{opacity:0},ease:Quad.easeOut});
							/* un-lock scroll position*/
							var html = jQuery('html');
							var scrollPosition = html.data('scroll-position');
							html.css('overflow', html.data('previous-overflow'));

							if(navigator.browserType != "MSIE")
								beep.play();
							else
								document.getElementById('beepIE').innerHTML="<embed src='beep-8.wav' hidden=true autostart=true loop=false/>";
							animating = false;
							$('#actionIpad').attr('src', 'img/Electronics/ipad-after-scan.png');

							$('#radScan').css('background-color','#F4F4F4');
							$('#radScan').css('width','30');
							$('#radScan').css('height','30');
							$('#radScan').css('border','3px solid #D0D0D0');
						}
					});
				}
			});
		}
		else{
			$('#radScan').css('background-color','#F4F4F4');
			$('#radScan').css('width','30');
			$('#radScan').css('height','30');
			$('#radScan').css('border','3px solid #D0D0D0');
		}

	});

	/*navigation between pages*/
	$('#clientpg1').click(function(){if($(this).attr("class") != "active"){$('#clientNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "clientpg2"){TweenMax.to($('#clientPage2'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){ $('#clientPage2').css('display','none');}});}else{TweenMax.to($('#clientPage3'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#clientPage3').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#clientPage1').css('display','block');TweenMax.to($('#clientPage1'),1,{css:{opacity:1},ease:Quad.easeOut});}});

	$('#clientpg2').click(function(){if($(this).attr("class") != "active"){$('#clientNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "clientpg1"){TweenMax.to($('#clientPage1'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#clientPage1').css('display','none');}});}else{TweenMax.to($('#clientPage3'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#clientPage3').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#clientPage2').css('display','block');TweenMax.to($('#clientPage2'),1,{css:{opacity:1},ease:Quad.easeOut});}});

	$('#clientpg3').click(function(){if($(this).attr("class") != "active"){$('#clientNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "clientpg1"){TweenMax.to($('#clientPage1'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#clientPage1').css('display','none');}});}else{TweenMax.to($('#clientPage2'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#clientPage2').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#clientPage3').css('display','block');TweenMax.to($('#clientPage3'),1,{css:{opacity:1},ease:Quad.easeOut});}});

	$('#presspg1').click(function(){if($(this).attr("class") != "active"){$('#pressNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "presspg2"){TweenMax.to($('#pressPage2'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#pressPage2').css('display','none');}});}else{TweenMax.to($('#pressPage3'),1,{ css:{opacity:0}, ease:Quad.easeOut,onComplete:function(){$('#pressPage3').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#pressPage1').css('display','block');TweenMax.to($('#pressPage1'),1,{css:{opacity:1},ease:Quad.easeOut});}});

	$('#presspg2').click(function(){if($(this).attr("class") != "active"){$('#pressNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "presspg1"){TweenMax.to($('#pressPage1'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#pressPage1').css('display','none');}});}else{TweenMax.to($('#pressPage3'), 1, { css:{opacity:0}, ease:Quad.easeOut,onComplete:function(){$('#pressPage3').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#pressPage2').css('display','block');TweenMax.to($('#pressPage2'),1,{css:{opacity:1},ease:Quad.easeOut});}});

	$('#presspg3').click(function(){if($(this).attr("class") != "active"){$('#pressNav').children().each(function(){if($(this).attr("class") == "active"){if($(this).attr("id") == "presspg1"){TweenMax.to($('#pressPage1'),1,{css:{opacity:0},ease:Quad.easeOut,onComplete:function(){$('#pressPage1').css('display','none');}});}else{TweenMax.to($('#pressPage2'), 1, { css:{opacity:0}, ease:Quad.easeOut,onComplete:function(){$('#pressPage2').css('display','none');}});}$(this).removeClass("active");}});$(this).addClass("active");$('#pressPage3').css('display','block');TweenMax.to($('#pressPage3'),1,{css:{opacity:1},ease:Quad.easeOut});}});
}

function navigate(){
	var section1Top=0;
	var section2Top=$('#onBoardFund').offset().top;
	var section3Top=$('#onBoardSales').offset().top;
	var section4Top=$('#about').offset().top;
	var section5Top=$('#press').offset().top;
	var section6Top=$('#contact').offset().top;

	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		if(curSection != 1){
			curSection=1;
			TweenLite.to($("#sticky_navigation"),1,{background:"#EFEFEF",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#EFEFEF",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#EFEFEF",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#EFEFEF",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){TweenLite.to(this,0,{color:"grey",ease:Power3.easeIn});});

			$("#navFace").attr("src","img/Logos/facebook-black.png");
			$("#navTwit").attr("src","img/Logos/twitter-black.png");
			$("#navFlick").attr("src","img/Logos/flickr-black.png");
		}

			if($(document).scrollTop() >= $('#onBoard').offset().top){
				parallaxScroll(2);
				TweenLite.to($('#sticky_navigation a.onboard'),0,{color:"black", ease:Power3.easeIn});
				TweenLite.to($('#sticky_navigation a.intro'),0,{color:"grey", ease:Power3.easeIn});
			}
			else{
				parallaxScroll(1);
				TweenLite.to($('#sticky_navigation a.intro'),0,{color:"black",ease:Power3.easeIn}); 
				TweenLite.to($('#sticky_navigation a.onboard'),0,{color:"grey",ease:Power3.easeIn});
			}

	} 
	else if($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		parallaxScroll(3);
		if(curSection != 2){
			curSection=2
			if(!counterActivated)
			{
				$("#moneyWrap").css('opacity', 1);
				$("#counter").css('opacity', 1);
				counterActivated = true;
				var startTime = Math.round((new Date(2013,1,1,0,0,0,0))/1000);
				var currentTime = Math.round((new Date()).getTime()/1000);
				var endNum = 1500000+(Math.round((currentTime-startTime)/2628000)*100000);
				$("#counter").flipCounter("startAnimation",{number:0,end_number:endNum,duration:1000,});
			}
			
			TweenLite.to($("#sticky_navigation"),1,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#FF3D3D",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){if(this.id != 'onBoardID' && this.id != 'dropDownFund')TweenLite.to(this,.5,{color:"black",ease:Power3.easeIn});});
			$('#dropDownFund').css('color','white');
			TweenLite.to($('#sticky_navigation a.onboard'),.5,{color:"white",ease:Power3.easeIn});
			$("#navFace").attr("src","img/Logos/facebook-black.png");
			$("#navTwit").attr("src","img/Logos/twitter-black.png");
			$("#navFlick").attr("src","img/Logos/flickr-black.png");
		}

	} 
	else if($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		parallaxScroll(4);
		if(curSection != 3){
			curSection=3;
			TweenLite.to($("#sticky_navigation"),1,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#56B3A6",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){if(this.id != 'onBoardID' && this.id != 'dropDownSales')TweenLite.to(this,.5,{color:"white",ease:Power3.easeIn});});
			$('#dropDownSales').css('color','black');
			TweenLite.to($('#sticky_navigation a.onboard'),.5,{color:"black",ease:Power3.easeIn});
			$("#navFace").attr("src","img/Logos/facebook-white.png");
			$("#navTwit").attr("src","img/Logos/twitter-white.png");
			$("#navFlick").attr("src","img/Logos/flickr-white.png");
		}

	} 
	else if($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		parallaxScroll(5);
		if(curSection != 4){
			curSection=4;
			TweenLite.to($("#sticky_navigation"),.5,{background:"#ffcc33",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#ffcc33",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#ffcc33",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#ffcc33",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){TweenLite.to(this,.5,{color:"black",ease:Power3.easeIn});});
			TweenLite.to($('#sticky_navigation a.about'),.5,{color:"white",ease:Power3.easeIn});
			$("#navFace").attr("src","img/Logos/facebook-black.png");
			$("#navTwit").attr("src","img/Logos/twitter-black.png");
			$("#navFlick").attr("src","img/Logos/flickr-black.png");
		}

	} 
	else if($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top){
		parallaxScroll(6);
		if(curSection != 5){
			curSection=5;
			TweenLite.to($("#sticky_navigation"),1,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#FF3D3D",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#FF3D3D",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){TweenLite.to(this,.5,{color:"white",ease:Power3.easeIn});});
			TweenLite.to($('#sticky_navigation a.press'),.5,{color:"black", ease:Power3.easeIn});
			$("#navFace").attr("src","img/Logos/facebook-white.png");
			$("#navTwit").attr("src","img/Logos/twitter-white.png");
			$("#navFlick").attr("src","img/Logos/flickr-white.png");
		}
	}
	else if($(document).scrollTop() >= section6Top){
		parallaxScroll(7);
		if(curSection != 6){
			curSection=6;
			TweenLite.to($("#sticky_navigation"),1,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#onBoardDropDown"),1,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownFund"),0,{background:"#56B3A6",ease:Power2.easeInOut});
			TweenLite.to($("#dropDownSales"),0,{background:"#56B3A6",ease:Power2.easeInOut});
			$('#sticky_navigation a').each(function(){TweenLite.to(this,.5,{color:"black",ease:Power3.easeIn});});
			TweenLite.to($('#sticky_navigation a.contact'),.5,{color:"white",ease:Power3.easeIn});
			$("#navFace").attr("src","img/Logos/facebook-black.png");
			$("#navTwit").attr("src","img/Logos/twitter-black.png");
			$("#navFlick").attr("src","img/Logos/flickr-black.png");
		}
	}
};