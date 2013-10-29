/***** GLOBAL VARIABLES *****/
var curSection=0;
var animating=false;
var isMobileBrowser = /Android|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent);
var isIpadBig=false;
var smallNavbar=false;
var animationActivated=false;
var parallax=false;
var virtualKeyboard=false;
var platform = navigator.platform.toLowerCase();

navigator.browserType = (function(){
	var app = navigator.appName;
	var browser = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	return (browser? browser[1]: app);
})();	

$(document).ready(function(){	 
	browserHandler();

	var startTime = Math.round((new Date(2013,1,1,0,0,0,0))/1000);
	var currentTime = Math.round((new Date()).getTime()/1000);
	var endNum = 1500000 + Math.round((currentTime-startTime)/26);
	var myCounter = new flipCounter('flip-counter', {value:endNum, inc:1, pace:26000, auto:true});

	$('#quotes1 blockquote').quovolver();
	$('#quotes2 blockquote').quovolver();
	$('#quotes3 blockquote').quovolver();
	$('#quotes4 blockquote').quovolver();

	$.mbAudio.sounds = {
		beep: {
			id: "beep",
			ogg: "beep-8.ogg",
			mp3: "beep-8.mp3"
		}
	};

	setNavbar();

	$('#intro').css('height',($(window).height()-200));
	$('#contact').css('height',$(window).height());
	$('#Emessage').val("Message");
	navigate();

	setEventListeners();
});

$(window).load(function(){
	$('#hideAll').css('display','none'); /* Get rid of loading cover */
	$('#navLogo').css('position','fixed');

	setTimeout(function(){
		navigate();
	}, 500);
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
	navigate();
	setNavbar();
};

function setNavbar(){
	if(!animating)
	{
		if(!smallNavbar)
		{
			if($(window).width() >= 950)
			{
				$('#navLogo').css('right',(($(window).width()/2)-48.6));
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
							$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 75));
						break;
					case "MSIE":
						$('#navbar').css('left',($(window).width()/2) - (($('#navbar').width() / 2) - 70));
						break;
					case "Safari":
						if(!isMobileBrowser)
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

				languageBar();
					
				$('.navbar').css('display', 'block');
			}
			else
			{
				$('.navbar').css('display', 'none');
				if(!animating)
				{
					animating = true;
					TweenMax.to($('#navLogo'), .5, {right: '2px', ease:Power2.easeIn,
						onComplete: function(){
							$('#navLogo').attr('src', 'img/Logos/nav-logo-menu.png');
							smallNavbar = true;
							animating = false;
							languageBar();
						} 
					});
				}		
			}
		}
		else if(!isMobileBrowser && $(window).width() > 950)
		{
			if(!animating)
			{
				smallNavbar = false;
				animating = true;
				$('#navLogo').attr('src', 'img/Logos/nav-logo.png');
				rightVal = (($(window).width()/2)-48.6);
				TweenMax.to($('#navLogo'), .5, {right: rightVal, ease:Power2.easeIn,
					onComplete: function(){
						$('.navbar').css('display', "block");
						animating = false;
						setNavbar();

						if(navigator.browserType == 'Firefox' || navigator.browserType == 'Opera')
						{
							$('#smallMenu a').css('font-size', '16px');
							$('#smallMenu a').css('text-shadow', '0px .1px 0');
						}
					} 
				});
			}
		}
		else
		{
			$('#navLogo').css('right', '2');
			$('#navLogo').css('top', '5px');
		}
	}
};

function languageBar(){
	if($(window).width() < 985)
	{
		$('.langWrap').css('display', 'none');
		$('.langWrap').css('width', '0px');
		$('#smallLang').css('display', 'block');
		TweenMax.to($('#smallLang'), 1, {opacity: 1, ease:Power2.easeIn});
	}
	else
	{
		$('.langWrap').css('display', 'block');
		$('.langWrap').css('width', '70px');
		TweenMax.to($('#smallLang'), 1, {opacity: 0, ease:Power2.easeIn,
			onComplete: function(){
				$('#smallLang').css('display', 'none');
			}
		});
	}
};

function validateEmail(email){
	return /^[a-zA-Z0-9].*@[a-zA-Z0-9].*\.[a-z]{1,3}/.test(email);
};

function sendEmail(){
	if($('#Ename').val()=="Name")
	{
		$('#Ename').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('Name must contain a value.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Email').val()=="E-mail" || !validateEmail($('#Email').val()))
	{
		$('#Email').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('E-mail must be valid.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Ewebsite').val()=="Website")
	{
		$('#Ewebsite').focus();
		$('#emailValidation').css('color', 'red');
		$('#emailValidation').text('Website must contain a value.');
		TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		return false;
	}
	if($('#Emessage').val()=="Message")
	{
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
		success: function(data)
		{
			$('#emailValidation').css('color', '#54AD97');
			$('#emailValidation').val('Your E-mail has been sent!');
			TweenMax.to($('#emailValidation'), .5, {opacity: 1, ease:Power2.easeIn });
		}
	});
};

function parallaxScroll(){
	if(!isMobileBrowser && ($(window).height() <= 1060) && navigator.browserType != 'MSIE' )
	{
		if(!parallax)
			parallax = true;

		var scrolled=$(window).scrollTop();

		switch(curSection)
		{
			case 1:
				$('#titleWrap').css('margin-top',(100+(scrolled*.25))+'px');
				$('#introIpadWrap').css('top',(0-(scrolled*.2)));
				$('#hex1').css('top',(50+(scrolled-$('#onBoard').offset().top)*.1));
				$('#hex2').css('top',(750-(scrolled-$('#onBoard').offset().top)*.2));
				$('#hex3').css('top',(670-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex14').css('top', (1000-(scrolled-$('#onBoard').offset().top)*.083));
				$('#hex4').css('top',(50-(scrolled-$('#onBoard').offset().top)*.15));
				$('#hex5').css('top',(205-(scrolled-$('#onBoard').offset().top)*.2));
				$('#hex6').css('margin-top',(40-(scrolled-$('#onBoard').offset().top)*.05));
				$('#ipad1').css('top',(55-(scrolled-$('#onBoard').offset().top)*.3));
				$('#ipad2').css('top',(800-(scrolled-$('#onBoard').offset().top)*.3));
				break;
			case 2:
				$('#hex1').css('top',(50+(scrolled-$('#onBoard').offset().top)*.1)); 
				$('#hex2').css('top',(750-(scrolled-$('#onBoard').offset().top)*.2));
				$('#hex14').css('top', (1000-(scrolled-$('#onBoard').offset().top)*.083));
				$('#hex3').css('top',(670-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex4').css('top',(50-(scrolled-$('#onBoard').offset().top)*.15)); 
				$('#hex5').css('top',(205-(scrolled-$('#onBoard').offset().top)*.2)); 
				$('#hex6').css('margin-top',(40-(scrolled-$('#onBoard').offset().top)*.05)); 
				$('#ipad1').css('top',(55-(scrolled-$('#onBoard').offset().top)*.3));
				$('#ipad2').css('top',(800-(scrolled-$('#onBoard').offset().top)*.3));
				if(scrolled >= 1600){
					$('#hex7').css('top',70-(scrolled-$('#onBoardFund').offset().top)*.125);
					$('#hex8').css('top',(500-(scrolled*.083)));
					$('#hex13').css('top',(900-(scrolled*.175)));
					$('#ipad3').css('top',125-(scrolled-$('#onBoardFund').offset().top)*.25);
					$('#picNav1').css('top',(parseInt($('#ipad3').css('top'))+parseInt($('#ipad3').css('height'))+10));
					$('#fundLogo').css('zoom',(1+(scrolled - 1600)*.0003));
				}
				break;
			case 3:
				$('#hex7').css('top',70-(scrolled-$('#onBoardFund').offset().top)*.125);
				$('#hex8').css('top',(500-(scrolled*.083)));
				$('#hex13').css('top',(900-(scrolled*.175)));
				$('#ipad3').css('top',125-(scrolled-$('#onBoardFund').offset().top)*.25);
				$('#picNav1').css('top',(parseInt($('#ipad3').css('top'))+parseInt($('#ipad3').css('height'))+10));
				if(scrolled >= ($('#onBoardSales').offset().top - $(window).height()))
				{
					$('#salesLogo').css('zoom',(1+(scrolled - ($('#onBoardSales').offset().top - $(window).height()))*.0003));
					$('#salesWrap').css('margin-top',180-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.2);
					$('#hex9').css('top',135-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.083);
					$('#hex10').css('top',370-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.125);
					$('#hex12').css('top', 525-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.175);
					$('#ipad4').css('top',325-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.3);
					$('#picNav2').css('top',(parseInt($('#ipad4').css('top'))+parseInt($('#ipad4').css('height'))+10));
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
				$('#hex12').css('top', 525-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.175);
				$('#ipad4').css('top',325-(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.3);
				$('#picNav2').css('top',(parseInt($('#ipad4').css('top'))+parseInt($('#ipad4').css('height'))+10));
				if(!animationActivated)
					$('#socialSales').css('bottom',-207+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
				else
					$('#socialSales').css('bottom',-307+(scrolled-($('#onBoardSales').offset().top - $(window).height()))*.15);
				if(scrolled >= ($('#about').offset().top - $(window).height()))
				{
					$('#heading9').css('opacity',(scrolled-($('#about').offset().top - $(window).height()))*.0015);
					$('#aboutWrap').css('margin-top',100-(scrolled-($('#about').offset().top - $(window).height()))*.15);
				}
				break;
			case 5:
				$('#aboutWrap').css('margin-top',100-(scrolled-($('#about').offset().top - $(window).height()))*.15);
				break;
			case 6:
				$('#contactWrap').css('top', 220-(scrolled-($('#contact').offset().top - $(window).height()))*.2);
				$('#sendWrap').css('margin-top', 180-(scrolled-($('#contact').offset().top - $(window).height()))*.25);
				break;
			case 7:
				$('#contactWrap').css('top', 220-(scrolled-($('#contact').offset().top - $(window).height()))*.2);
				$('#sendWrap').css('margin-top', 180-(scrolled-($('#contact').offset().top - $(window).height()))*.25);
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
		$('#hex14').css('top',950);
		$('#hex3').css('top',625); 
		$('#hex4').css('top',-15);
		$('#hex5').css('top',230);
		$('#hex6').css('margin-top', 40);
		$('#ipad1').css('top',30);
		$('#ipad2').css('top',650);
		$('#hex7').css('top',70);
		$('#hex8').css('top',300);
		$('#hex13').css('top', 500);
		$('#ipad3').css('top',100);
		$('#fundLogo').css('zoom',1);
		$('#salesLogo').css('zoom',1);
		$('#salesWrap').css('margin-top',50);
		$('#hex9').css('top',135);
		$('#hex10').css('top',370);
		$('#hex12').css('top', 400);
		$('#ipad4').css('top',100);
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

function browserHandler(){

	if(isMobileBrowser)
	{
		smallNavbar = true;
		$('#navLogo').attr('src', 'img/Logos/nav-logo-menu.png');
	}

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

	    	$('#follow').css('width', '360px');

		    if(navigator.browserType == 'Chrome' )
			{
					$('h1, h2, h3, h4, h5, h6, #sticky_navigation ul li a, #smallMenu a, .lang').css('-webkit-text-stroke-width', '.5px');
					$('.langWrap p, .langWrap a, p').css('-webkit-text-stroke-width', '.9px');
					$('body').css('-webkit-text-stroke-width', '.1px');
			}
			else if(navigator.browserType == 'Firefox' || navigator.browserType == 'Opera')
			{
				$('#sticky_navigation ul li a, .langWrap p, .langWrap a, #smallMenu a, .lang').css('font-size', '16px');
				$('#sticky_navigation ul li a, .langWrap p, .langWrap a, p, #smallMenu a, .lang').css('text-shadow', '0px .1px 0');
				$('.campaignWrap a, .camInfo').css('font-size', '14px');
				$('.camInfo').css('margin-left', '0px');
				$('.camInfo').css('margin-right', '0px');
				$('#aboutBody, #pressBody').css('margin-top', '-10px');

				if(navigator.browserType == 'Firefox')
					$('#share').css('padding-left', '80px');
			}
	    }
	    else
	    {
	    	$('#picNav1').css('display', 'none');
	    	$('#aboutBody, #pressBody').css('margin-top', '-10px');
	    	$('#share').css('padding-left', '80px');
	    	$('.navbar-inner').css('max-height', '50px');
	    }
    }
    else
    {
    	if(navigator.browserType != 'Chrome')
    	{
    		$('#sticky_navigation ul li a, #smallMenu a, .lang').css('font-family', "'Quicksand-Bold',Quicksand,Arial,sans-serif");
			$('#sticky_navigation ul li a, #smallMenu a, .lang').css('font-weight', "500");
			if(navigator.browserType == 'Opera')
				$('#aboutBody, #pressBody').css('margin-top', '-10px');
		}
    }
}

function setEventListeners(){
	var firstTime = true;
	$(window).bind('scroll',function(){
		if(virtualKeyboard)
		{
			var scrollTop = $(window).scrollTop();
	  		var offsetTop = $('#navLogo').offset().top;

			if (Math.abs(scrollTop - offsetTop) > 1) 
			{
				$('#navLogo').css('position', 'absolute');
				setTimeout(function()
				{
					$('#navLogo').css('position', 'fixed');
		    	}, 100);
	  		}
		}
		navigate();
	});

	$('input, #Emessage').focus(function(){
		if(isMobileBrowser)
		{
			virtualKeyboard = true;
			setTimeout(function()
			{
				$(window).scrollTop($(window).scrollTop());
	    	}, 200);	

	    	$(this).off('blur');
		}
	});

	$('input, #Emessage').blur(function(){
		if(isMobileBrowser)
		{
			if(firstTime)
			{
				firstTime = false;
				$(this).trigger('click');
			}
			else
			{
		  		setTimeout(function()
				{
					virtualKeyboard = false;
					$('input').each(function(){
						if($(this).is(":focus"))
							virtualKeyboard = true;
					});
					if($('#Emessage').is(":focus"))
						virtualKeyboard = true;
			    }, 100);
		  	}
		}
	});

	$('#playVideo').click(function(){
		$('#videoWrap').css("display", "inline");
		$('#embeddedVideo').attr("src", "//www.youtube.com/embed/-7akjeomUck?rel=0&autoplay=1")
		$('.demoDiv').css("display", "none");
		TweenMax.to($('#videoWrap'), .5, {css: {opacity: 1}, ease:Quad.easeOut});
		$('html, body').animate({scrollTop:$('#videoWrap').offset().top},{ complete: function(){$('html, body').scrollTop($('#videoWrap').offset().top);}}, 500);
	});

	$('#backFromVid').click(function(){
		TweenMax.to($('#videoWrap'), .5, {css: {opacity: 0}, ease:Quad.easeOut,
			onComplete:function(){
				$('#videoWrap').css("display", "none");
				$('#embeddedVideo').attr("src", "")
				$('.demoDiv').css("display", "inline");
			}
		});
	})

	$('a.intro, a.onboard, #dropDownFund, a.fundraising, #dropDownSales, a.sales, a.about, a.press, a.contact').click(function(){
		var scrollID;

		switch($(this).attr("id"))
		{
			case "homeID":
			case "homeSmall":
				scrollID = "#intro";
				break;
			case "onBoardID":
			case "onBoardSmall":
				scrollID = "#onBoard";
				break;
			case "dropDownFund":
			case "fundSmall":
				scrollID = "#onBoardFund";
				break;
			case "dropDownSales":
			case "salesSmall":
				scrollID = "#onBoardSales";
				break;
			case "aboutID":
			case "aboutSmall":
				scrollID = "#about";
				break;
			case "pressID":
			case "pressSmall":
				scrollID = "#press";
				break;
			case "contactID":
			case "contactSmall":
				scrollID = "#contact";
				break;
		}

		if(($(document).scrollTop() >= $(scrollID).offset().top+150) || ($(document).scrollTop() < $(scrollID).offset().top-150))
		{
			var offset = $(scrollID).offset().top+5;

			animating = true;
			if(isMobileBrowser)
			{
				$('html, body').scrollTo(offset, 0, 
				{
					onAfter:function()
					{
						animating = false; 
						navigate();
					}
				});
				$('#smallMenu').trigger('mouseleave');
			}
			else
			{
				$('html, body').animate({
					scrollTop:(offset)},
					{
						complete: function()
						{
							animating = false;
							navigate();
						}
					}, 1000);
			}
		}
	});

	
	$('a.onboard, #onBoardDropDown').hover(
		function(){
			$('#onBoardDropDown').css('display','block');
			switch(curSection) 
			{
				case 1:
				case 2:
				case 3:
				case 6:
					$('#caret').css("background-image", "url(img/arrow-dropdown-black.png)");
					break;
				case 5:
					$('#caret').css("background-image", "url(img/arrow-dropdown.png)");
					break;
				case 4:
				case 7:
					$('#caret').css("background-image", "url(img/arrow-dropdown-light.png)");
					break;
			}
		},
		function(){
			$('#onBoardDropDown').css('display','none');
			switch(curSection) 
			{
				case 1:
				case 2:
					$('#caret').css("background-image", "url(img/arrow-dropdown.png)");
					break;
				case 3:
				case 6:
					$('#caret').css("background-image", "url(img/arrow-dropdown-light.png)");
					break;
				case 4:
				case 5:
				case 7:
					$('#caret').css("background-image", "url(img/arrow-dropdown-black.png)");
					break;
			}
	});

	$('.lang, #dropDownEn').hover(
		function(){
			TweenMax.to($('#dropDownEn'), .5, {css: {opacity:1}, ease:Quad.easeOut});
			$('#langDropDown').css('display', 'block');
		},
		function(){
			setTimeout(function(){
				if($('#langDropDown:hover').length == 0 && $('.lang:hover').length == 0){
					TweenMax.to($('#dropDownEn'), .5, {css: {opacity:.5}, ease:Quad.easeOut});
					$('#langDropDown').css('display','none');
				}
			}, 0);
		}
	);

	$('#navLogo, #smallMenu').hover(
		function()
		{
			if(smallNavbar && $(this).attr('id') == 'navLogo')
			{
				if(isMobileBrowser)
					$('#navLogo').trigger('click');
				else
				{
					$('#smallMenu').css('display', 'block');
					TweenMax.to($('#smallMenu'), .5, {css: {right:51}, ease:Quad.easeOut});
				}
			}
		},
		function()
		{
			setTimeout(function(){
				if(!isMobileBrowser && $('#navLogo:hover').length == 0 && $('#smallMenu:hover').length == 0 && $('#smallMenu a:hover').length == 0)
					TweenMax.to($('#smallMenu'), .5, {css: {right:-300}, ease:Quad.easeOut,
						onComplete: function(){
							$('#smallMenu').css('display', 'none');
						}
					});
			}, 100);
		}
	);

	$('#navLogo').click(function(){
		if(isMobileBrowser)
		{
			if($('#smallMenu').css('right') != '71px')
			{
				$('#smallMenu').css('display', 'block');
				TweenMax.to($('#smallMenu'), .5, {css: {right:71}, ease:Quad.easeOut});
			}
			else
				TweenMax.to($('#smallMenu'), 1, {css: {right:-300}, ease:Quad.easeOut,
					onComplete: function(){
						$('#smallMenu').css('display', 'none');
					}
				});
		}		
	});

	$('#smallMenu').mouseleave(function(){
		setTimeout(function(){
			if($('#navLogo:hover').length == 0)
			{
				TweenMax.to($('#smallMenu'), 1, {css: {right:-300}, ease:Quad.easeOut,
					onComplete: function(){
						$('#smallMenu').css('display', 'none');
					}
				});
			}
		}, 200);
	});

	$('#dropDownFund, #dropDownSales, #dropDownFr, #dropDownSp, #smallMenu a').hover(
		function(){
		if(!isMobileBrowser)
		{
			if(!animating)
			{
				if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
					$(this).css('background-color','#79C1AF');
				else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
					$(this).css('background-color','#F06757');
				else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
					$(this).css('background-color','#fdda73');
				else
					$(this).css('background-color','#DDD');
			}
		}
		else
			$(this).trigger('click');

	}, function(){
		if(!isMobileBrowser)
		{
			if(!animating)
			{
				if(($(document).scrollTop() >= $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardSales').offset().top && $(document).scrollTop() < $('#about').offset().top))
					$(this).css('background-color','#54AD97');
				else if(($(document).scrollTop() >= $('#press').offset().top && $(document).scrollTop() < $('#contact').offset().top) || ($(document).scrollTop() >= $('#onBoardFund').offset().top && $(document).scrollTop() < $('#onBoardSales').offset().top))
					$(this).css('background-color','#F04B38');
				else if($(document).scrollTop() >= $('#about').offset().top && $(document).scrollTop() < $('#press').offset().top)
					$(this).css('background-color','#fdce44');
				else
				{
					$(this).css('background-color','#EFEFEF');
				}
			}
		}
	});

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
				$('#arrow4').css(
				{
					'-moz-transform' : 'scaleY(-1)',
					'-o-transform' : 'scaleY(-1)',
					'-webkit-transform' : 'scaleY(-1)',
					'transform': 'scaleY(-1)'
				});
				
				$('#ipadAction').css('display', 'block');

				var	newHeight = 700;
				
				if(navigator.browserType == "Chrome" || navigator.browserType == "Safari")
				{
					TweenMax.to($('#ipadAction'),1, {css:{height:newHeight}, ease:Quad.easeOut,
						onComplete:function()
						{
							TweenMax.to($('#actionWrapper'),1,{css:{opacity:1}, ease:Quad.easeOut});
							$('#actionWrap').css('height', (newHeight*.75));
							animating = false;
							$('#radScan').trigger('click');
						}
					});
					TweenMax.to($('#socSalesContainer'),1, {css:{top:(newHeight + 98)}, ease:Quad.easeOut});
					TweenMax.to($('#quotes2'),1, {css:{'margin-top':(newHeight + 98)}, ease:Quad.easeOut});
				}
				else
				{
					$('#ipadAction').css('height', newHeight);
					TweenMax.to($('#actionWrapper'),1,{css:{opacity:1}, ease:Quad.easeOut,
						onComplete:function()
						{
							$('#radScan').trigger('click');
						}
					});
					$('#actionWrap').css('height', (newHeight*.75));
					animating = false;
					$('#socSalesContainer').css('top', (newHeight + 98));
					$('#quotes2').css('margin-top', (newHeight + 98));
				}
			}
			else
			{
				animationActivated = false;
				$('#arrow4').css(
				{
					'-moz-transform' : 'scaleY(1)',
					'-o-transform' : 'scaleY(1)',
					'-webkit-transform' : 'scaleY(1)',
					'transform': 'scaleY(1)'
				});

				if(navigator.browserType == "Chrome")
				{
					TweenMax.to($('#actionWrapper'),1,{css:{opacity:0}, ease:Quad.easeOut,
						onComplete:function()
						{
							TweenMax.to($('#ipadAction'),1, {css:{height:0}, ease:Quad.easeOut,
								onComplete:function()
								{
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
						onComplete:function()
						{
							TweenMax.to($('#ipadAction'),1, {css:{height:0}, ease:Quad.easeOut,
								onComplete:function()
								{
									$('#ipadAction').css('display', 'none');
								}
							});
							TweenMax.to($('#socSalesContainer'),1, {css:{top:0}, ease:Quad.easeOut,
								onComplete: function()
								{
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
		if(!animating)
		{
			animating = true;
			$('#radSwipe').css('background-color','#F04B38');
			$('#radSwipe').css('width','25');
			$('#radSwipe').css('height','25');
			$('#radSwipe').css('border','10px solid #eeeeee');
			$('#actionIpad').attr('src', 'img/Electronics/ipad-before-swipe.png');

			var beep = $('#beep')[0];
			beep.volume=0.1;

			if($(window).scrollTop() <= ($('#ipadAction').offset().top - 5) || $(window).scrollTop() >= ($('#ipadAction').offset().top + 5))
				$('html, body').animate({scrollTop:$('#ipadAction').offset().top},{ complete: function(){$('html, body').scrollTop($('#ipadAction').offset().top);}}, 500);

			TweenMax.to($('#creditCard'),0,{css:{top:'-20%',opacity:0},ease:Quad.easeOut});
			TweenMax.to($('#txtSwipe'),1,{css:{opacity:1},ease:Quad.easeOut});
			TweenMax.to($('#creditCard'),2,{css:{opacity:1},ease:Quad.easeOut,
				onComplete:function()
				{
					TweenMax.to($('#creditCard'),1.5,{css:{top:'45%'},ease:Power2.easeOut,
						onComplete:function()
						{
							TweenMax.to($('#creditCard'),2,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#txtSwipe'),1,{css:{opacity:0},ease:Quad.easeOut});

							$.mbAudio.play('beep');

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
	});

	$('#radScan').click(function(){
		if(!animating)
		{
			animating = true;
			$('#radScan').css('background-color','#54AD97');
			$('#radScan').css('width','25');
			$('#radScan').css('height','25');
			$('#radScan').css('border','10px solid #eeeeee');
			$('#actionIpad').attr('src', 'img/Electronics/ipad-before-scan.png');
			var beep = $('#beep')[0];
			beep.volume=0.1;
			setScanPosition();

			if($(window).scrollTop() <= ($('#ipadAction').offset().top-5) || $(window).scrollTop() >= ($('#ipadAction').offset().top + 5))
				$('html, body').animate({scrollTop:$('#ipadAction').offset().top},{ complete: function(){$('html, body').scrollTop($('#ipadAction').offset().top);}},1000);

			TweenMax.to($('#txtScan'),1,{css:{opacity:1},ease:Quad.easeOut});
			TweenMax.to($('#license'),1.5,{css:{opacity:1},ease:Quad.easeOut,
				onComplete:function()
				{
					TweenMax.to($('#beam'),2,{css:{opacity:1},ease:Quad.easeOut,
						onComplete:function()
						{
							TweenMax.to($('#txtScan'),1,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#beam'),1.5,{css:{opacity:0},ease:Quad.easeOut});
							TweenMax.to($('#license'),1.5,{css:{opacity:0},ease:Quad.easeOut});

							$.mbAudio.play('beep');

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
	});

	/*navigation between pages*/
	$('#clientpg1, #clientpg2, #clientpg3').click(function(){
		if($(this).attr("class") != "active")
		{
			$('#clientNav').children().each(function(){
				if($(this).attr("class") == "active")
				{
					if($(this).attr("id") == "clientpg1")
					{
						TweenMax.to($('#clientPage1'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){ 
								$('#clientPage1').css('display','none');
							}
						});
					}
					else if($(this).attr("id") == "clientpg2")
					{
						TweenMax.to($('#clientPage2'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){ 
								$('#clientPage2').css('display','none');
							}
						});
					}
					else
					{
						TweenMax.to($('#clientPage3'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){
								$('#clientPage3').css('display','none');
							}
						});
					}

					$(this).removeClass("active");
				}
			});

			$(this).addClass("active");
			if($(this).attr("id") == "clientpg1")
			{
				$('#clientPage1').css('display','block');
				TweenMax.to($('#clientPage1'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
			else if($(this).attr("id") == "clientpg2")
			{
				$('#clientPage2').css('display','block');
				TweenMax.to($('#clientPage2'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
			else
			{
				$('#clientPage3').css('display','block');
				TweenMax.to($('#clientPage3'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
		}
	});

	$('#picpg1, #picpg2, #picpg3, #picpg4').click(function(){
		if($(this).attr("class") != "active")
		{
			var srcString;
			var parent;
			var iPad;

			if($(this).attr("id") == "picpg1" || $(this).attr("id") == "picpg2")
			{
				parent = "#picNav1";
				iPad = "#ipad3";
			}
			else
			{
				parent = "#picNav2";
				iPad = "#ipad4";
			}

			$(parent).children().each(function(){
				if($(this).attr("class") == "active")
					$(this).removeClass("active");
			});

			$(this).addClass("active");

			if(parent == "#picNav1")
			{
				if($(this).attr("id") == "picpg1")
					srcString = "img/Electronics/ipad-dash.png";
				else
					srcString = "img/Electronics/ipad-submissions.png";
			}
			else
			{
				if($(this).attr("id") == "picpg3")
					srcString = "img/Electronics/ipad-receipt.png";
				else
					srcString = "img/Electronics/ipad-dash.png";
			}

			TweenMax.to($(iPad),.5,{css:{opacity:0},ease:Quad.easeOut,
				onComplete:function(){
					$(iPad).attr("src", srcString);
					TweenMax.to($(iPad),.5,{css:{opacity:1},ease:Quad.easeOut});
					navigate();
				}
			});
		}
	});

	$('#presspg1, #presspg2, #presspg3').click(function(){
		if($(this).attr("class") != "active")
		{
			$('#pressNav').children().each(function(){
				if($(this).attr("class") == "active")
				{
					if($(this).attr("id") == "presspg1")
					{
						TweenMax.to($('#pressPage1'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){
								$('#pressPage1').css('display','none');
							}
						});
					}
					else if($(this).attr("id") == "presspg2")
					{
						TweenMax.to($('#pressPage2'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){
								$('#pressPage2').css('display','none');
							}
						});
					}
					else
					{
						TweenMax.to($('#pressPage3'),1,{css:{opacity:0},ease:Quad.easeOut,
							onComplete:function(){
								$('#pressPage3').css('display','none');
							}
						});
					}

					$(this).removeClass("active");
				}
			});

			$(this).addClass("active");

			if($(this).attr("id") == "presspg1")
			{
				$('#pressPage1').css('display','block');
				TweenMax.to($('#pressPage1'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
			else if($(this).attr("id") == "presspg2")
			{
				$('#pressPage2').css('display','block');
				TweenMax.to($('#pressPage2'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
			else
			{
				$('#pressPage3').css('display','block');
				TweenMax.to($('#pressPage3'),1,{css:{opacity:1},ease:Quad.easeOut});
			}
		}
	});
}

function navigate()
{
	var section1Top=0;
	var section2Top=$('#onBoardFund').offset().top;
	var section3Top=$('#onBoardSales').offset().top;
	var section4Top=$('#about').offset().top;
	var section5Top=$('#press').offset().top;
	var section6Top=$('#contact').offset().top;

	var section;
	var clrBackground;
	var clrHover;
	var clrFont;
	var clrFontActive;
	var activeBookmarks;
	var srcCaret;
	var clrSocial;

	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top)
	{
		clrBackground = "#EFEFEF";
		clrHover = "#DDD";
		clrFont = "grey";
		clrFontActive = "black";
		srcCaret = "img/arrow-dropdown.png";
		clrSocial = "black";

		if($(document).scrollTop() >= $('#onBoard').offset().top)
		{
			activeBookmarks = "#sticky_navigation a.onboard, #smallMenu a.onboard";
			section = 2;
		}
		else
		{
			activeBookmarks = "#sticky_navigation a.intro, #smallMenu a.intro";
			section = 1;
		}
	}
	else if($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top)
	{
		section = 3;
		clrBackground = "#F04B38";
		clrHover = "#F06757";
		clrFont = "black";
		clrFontActive = "white";
		activeBookmarks = "#sticky_navigation a.onboard, #dropDownFund, #smallMenu a.fundraising";
		srcCaret = "img/arrow-dropdown-light.png";
		clrSocial = "black";
	}
	else if($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top)
	{
		section = 4;
		clrBackground = "#54AD97";
		clrHover = '#79C1AF';
		clrFont = "white";
		clrFontActive = "black";
		activeBookmarks = "#sticky_navigation a.onboard, #dropDownSales, #smallMenu a.sales";
		srcCaret = "img/arrow-dropdown-black.png";
		clrSocial = "white";
	}
	else if($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top)
	{
		section = 5;
		clrBackground = "#fdce44";
		clrHover = '#fdda73';
		clrFont = "black";
		clrFontActive = "white";
		activeBookmarks = "#sticky_navigation a.about, #smallMenu a.about";
		srcCaret = "img/arrow-dropdown-black.png";
		clrSocial = "black";
	}
	else if($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top)
	{
		section = 6;
		clrBackground = "#F04B38";
		clrHover = "#F06757";
		clrFont = "white";
		clrFontActive = "black";
		activeBookmarks = "#sticky_navigation a.press, #smallMenu a.press";
		srcCaret = "img/arrow-dropdown-light.png";
		clrSocial = "white";
	}
	else if($(document).scrollTop() >= section6Top)
	{
		section = 7;
		clrBackground = "#54AD97";
		clrHover = '#79C1AF';
		clrFont = "black";
		clrFontActive = "white";
		activeBookmarks = "#sticky_navigation a.contact, #smallMenu a.contact";
		srcCaret = "img/arrow-dropdown-black.png";
		clrSocial = "black";
	}

	if((curSection != section) && $(document).scrollTop() >= section1Top && $(document).scrollTop() < $(document).height()) 
	{
		if(!animating)
		{
			curSection = section;
			TweenLite.to($("#sticky_navigation, #onBoardDropDown, #langDropDown, #smallMenu, #dropDownFund, #dropDownSales, #dropDownFr, #dropDownSp, #smallMenu a"),0,{background:String(clrBackground),ease:Power2.easeInOut,
				onComplete:function(){
					var hoverString;
					$('.dropdown-menu li a').each(function()
					{
						hoverString = '#'+$(this).attr('id')+':hover';
						if($(hoverString).length != 0)
							$(this).css('background-color',clrHover);
					});
				}
			});
			$('#sticky_navigation a, #smallMenu a').each(function(){TweenLite.to(this,0,{color:clrFont,ease:Power3.easeIn});});
			setTimeout(function(){
				if(!animating && curSection == section)
					TweenLite.to($(activeBookmarks),.4,{color:clrFontActive, ease:Power3.easeIn});
			},300);
			$('#caret').css("background-image", "url("+srcCaret+")");
			$("#navFace").attr("src","img/Logos/facebook-"+clrSocial+".png");
			$("#navTwit").attr("src","img/Logos/twitter-"+clrSocial+".png");
			$("#navFlick").attr("src","img/Logos/flickr-"+clrSocial+".png");
		}	
	}

	parallaxScroll();
};