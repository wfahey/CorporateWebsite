/*
 * jQuery Flip Counter v1.2 by Brolly.ca - http://bloggingsquared.com/jquery/flipcounter/
 *
 * Uses valid markup and an image sprite to render an analogue clock / odometer effect.
 * Clock image is easily customizable, default options can be easily overriden, can be easily animated and extended with jQuery.easing plugin, gracefully degrades if Javascript is not available.
 *
 * TERMS OF USE - jQuery Flip Counter
 * 
 * Open source under the BSD License. 
 * 
 * Copyright (C) 2010 Dan Imbrogno and Brolly Inc. 
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

(function($){$.fn.flipCounter=function(method){var obj=false;var defaults={number:0,numIntegralDigits:1,numFractionalDigits:0,digitClass:'counter-digit',counterFieldName:'counter-value',digitHeight:40,digitWidth:30,imagePath:'img/flipCounter-medium.png',easing:false,duration:10000,onAnimationStarted:false,onAnimationStopped:false,onAnimationPaused:false,onAnimationResumed:false,formatNumberOptions:false};var methods={init:function(options){return this.each(function(){obj=$(this);var new_options=$.extend(defaults,options);var old_options=obj.data('flipCounter');options=$.extend(old_options,new_options);obj.data('flipCounter',options);if(options.number===false||options.number==0){(_getCounterValue()!==false)?options.number=_getCounterValue():options.number=0;_setOption('number',options.number);}
_setOption('animating',false);_setOption('start_time',false);obj.bind('startAnimation',function(event,options){_startAnimation(options);});obj.bind('pauseAnimation',function(event){_pauseAnimation();});obj.bind('resumeAnimation',function(event){_resumeAnimation();});obj.bind('stopAnimation',function(event){_stopAnimation();});obj.htmlClean();_renderCounter();})},renderCounter:function(value){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();_setOption('number',value);_renderCounter();});},setNumber:function(value){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();_setOption('number',value);_renderCounter();});},getNumber:function(){var val=false;this.each(val=function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();val=_getOption('number');return val;});return val;},startAnimation:function(options){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();obj.trigger('startAnimation',options);});},stopAnimation:function(){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();obj.trigger('stopAnimation');});},pauseAnimation:function(){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();obj.trigger('pauseAnimation');});},resumeAnimation:function(){return this.each(function(){obj=$(this);if(!_isInitialized())$(this).flipCounter();obj.trigger('resumeAnimation');});}};if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.flipCounter');}
function _isInitialized(){var data=obj.data('flipCounter');if(typeof data=='undefined')return false
return true;}
function _getOption(option){var data=obj.data('flipCounter');var value=data[option];if(typeof value!=='undefined'){return value;}
return false;}
function _setOption(option,value){var data=obj.data('flipCounter');data[option]=value;obj.data('flipCounter',data);}
function _setupCounter(){if(obj.children('[id="'+_getOption('counterFieldName')+'"]').length<1){obj.append('<input type="hidden" name="'+_getOption('counterFieldName')+'" value="'+_getOption('number')+'" />');}
var digits_length=_getDigitsLength();var num_digits_needed=_getNumberFormatted().length;if(num_digits_needed>digits_length){for(i=0;i<(num_digits_needed-digits_length);i++){var digit_element=$('<span class="'+_getOption('digitClass')+'" style="'+_getDigitStyle('0')+'" />');obj.prepend(digit_element);}}else if(num_digits_needed<digits_length){for(i=0;i<(digits_length-num_digits_needed);i++){obj.children('.'+_getOption('digitClass')).first().remove();}}
obj.find('.'+_getOption('digitClass')).each(function(){if(0==$(this).find('span').length)
{$(this).append('<span style="visibility:hidden">0</span>');}});}
function _renderCounter(){_setupCounter();var number=_getNumberFormatted();var digits=_getDigits();var pos=0;$.each(digits,function(index,value){digit=number.toString().charAt(pos);$(this).attr('style',_getDigitStyle(digit));$(this).find('span').text(digit.replace(' ','&nbsp;').toString());pos++});_setCounterValue();}
function _getDigits(){return obj.children('.'+_getOption('digitClass'));}
function _getDigitsLength(){return _getDigits().length;}
function _getCounterValue(){var val=parseFloat(obj.children('[name="'+_getOption('counterFieldName')+'"]').val());if(val==val==false)return false;return val;}
function _setCounterValue(){obj.children('[name="'+_getOption('counterFieldName')+'"]').val(_getOption('number'));}
function _getNumberFormatted(){var number=_getOption('number');if(typeof number!=='number'){$.error('Attempting to render non-numeric value.');return'0';}
var str_number='';if(_getOption('formatNumberOptions'))
{if($.formatNumber){str_number=$.formatNumber(number,_getOption('formatNumberOptions'));}else{$.error('The numberformatter jQuery plugin is not loaded. This plugin is required to use the formatNumberOptions setting.');}}else{if(number>=0){var num_integral_digits=_getOption('numIntegralDigits');var num_extra_zeros=num_integral_digits-number.toFixed().toString().length;for(var i=0;i<num_extra_zeros;i++){str_number+='0';}
str_number+=number.toFixed(_getOption('numFractionalDigits'));}else{str_number='-'+Math.abs(number.toFixed(_getOption('numFractionalDigits')));}}
return str_number;}
function _getDigitStyle(character)
{var style="height:"+_getOption('digitHeight')+"px; width:"+_getOption('digitWidth')+"px; display:inline-block; background-image:url('"+_getOption('imagePath')+"'); background-repeat:no-repeat; ";var bg_pos=new Array();bg_pos['1']=_getOption('digitWidth')*0;bg_pos['2']=_getOption('digitWidth')*-1;bg_pos['3']=_getOption('digitWidth')*-2;bg_pos['4']=_getOption('digitWidth')*-3;bg_pos['5']=_getOption('digitWidth')*-4;bg_pos['6']=_getOption('digitWidth')*-5;bg_pos['7']=_getOption('digitWidth')*-6;bg_pos['8']=_getOption('digitWidth')*-7;bg_pos['9']=_getOption('digitWidth')*-8;bg_pos['0']=_getOption('digitWidth')*-9;bg_pos['.']=_getOption('digitWidth')*-10;bg_pos['-']=_getOption('digitWidth')*-11;bg_pos[',']=_getOption('digitWidth')*-12;bg_pos[' ']=_getOption('digitWidth')*-13;if(character in bg_pos)
{return style+'background-position: '+bg_pos[character]+'px 0px;'}
return style;}
function _startAnimation(options){if(true==_getOption('animating'))_stopAnimation();if(typeof options!=='undefined'){options=$.extend(obj.data('flipCounter'),options);obj.data('flipCounter',options);}else{options=obj.data('flipCounter');}
if(false==_getOption('start_time')){_setOption('start_time',new Date().getTime());}
if(false==_getOption('time')){_setOption('time',0);}
if(false==_getOption('elapsed')){_setOption('elapsed','0.0');}
if(false==_getOption('start_number')){_setOption('start_number',_getOption('number'));if(false==_getOption('start_number')){_setOption('start_number',0);}}
_doAnimation();var onAnimationStarted=_getOption('onAnimationStarted');if(typeof onAnimationStarted=='function')onAnimationStarted.call(obj,obj);}
function _doAnimation(){var start_time=_getOption('start_time');var time=_getOption('time');var elapsed=_getOption('elapsed');var start_number=_getOption('start_number');var number_change=_getOption('end_number')-_getOption('start_number');if(number_change==0)return false;var duration=_getOption('duration');var easing=_getOption('easing');_setOption('animating',true);function animation_step(){time+=10;elapsed=Math.floor(time/10)/10;if(Math.round(elapsed)==elapsed){elapsed+='.0';}
_setOption('elapsed',elapsed);var diff=(new Date().getTime()-start_time)-time;var new_num=0;if(typeof easing=='function'){new_num=easing.apply(obj,[false,time,start_number,number_change,duration]);}
else
{new_num=_noEasing(false,time,start_number,number_change,duration);}
_setOption('number',new_num);_setOption('time',time);_renderCounter();if(time<duration){_setOption('interval',window.setTimeout(animation_step,(10-diff)));}else{_stopAnimation();}}
window.setTimeout(animation_step,10);}
function _stopAnimation(){if(false==_getOption('animating'))return false;clearTimeout(_getOption('interval'));_setOption('start_time',false);_setOption('start_number',false);_setOption('end_number',false);_setOption('time',0);_setOption('animating',false);_setOption('paused',false);var onAnimationStopped=_getOption('onAnimationStopped');if(typeof onAnimationStopped=='function')onAnimationStopped.call(obj,obj);}
function _pauseAnimation(){if(false==_getOption('animating')||true==_getOption('paused'))return false;clearTimeout(_getOption('interval'));_setOption('paused',true);var onAnimationPaused=_getOption('onAnimationPaused');if(typeof onAnimationPaused=='function')onAnimationPaused.call(obj,obj);}
function _resumeAnimation(){if(false==_getOption('animating')||false==_getOption('paused'))return false;_setOption('paused',false);_doAnimation();var onAnimationResumed=_getOption('onAnimationResumed');if(typeof onAnimationResumed=='function')onAnimationResumed.call(obj,obj);}
function _noEasing(x,t,b,c,d){return t/d*c+b;}}})(jQuery);jQuery.fn.htmlClean=function(){this.contents().filter(function(){if(this.nodeType!=3){$(this).htmlClean();return false;}else{return!/\S/.test(this.nodeValue);}}).remove();}