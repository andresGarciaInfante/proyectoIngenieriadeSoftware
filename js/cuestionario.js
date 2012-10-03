	var preguntas = [];
	var respuestas = [];
	var pregunta = 1;
	$(document).on("ready", function(){
		$.getJSON('js/preguntas.json', function(data){
		  	$.each(data.preguntas, function(key, value) {		
				preguntas.push('<p class="tituloPregunta">' + value['pregunta'] +'</p>');
				preguntas.push('<ul class="respuestas">');
				$.each(value['respuestas'], function(key, value) {
					preguntas.push('<li>' + value +'</li>');
				});
				preguntas.push('</ul>');
				
				$('<div/>', {
					'id': 'pregunta' + pregunta++,
    				'class': 'pregunta',
    				html: preguntas.join('')
  				}).appendTo('.preguntas');
				preguntas = [];
		  	});
			pregunta = 1;
			
			$('.preguntas').append('<div class="anterior">Anterior</div>');
			$('.preguntas').append('<div class="siguiente">Siguiente</div>');
			$('.preguntas').append('<div class="finalizar">Finalizar</div>');
			
			$('.anterior').on("click",function(){
				pregunta--;
				cargarPregunta(pregunta);
			});
		
			$('.siguiente').on("click",function(){
				if($('#pregunta'+ pregunta + ' li.selected').length > 0){
					pregunta++;
					cargarPregunta(pregunta);
				}
			});
			$('.finalizar').on("click",function(){
				$('li.selected').each(function(key, value) {
					alert($(this).text());
				});
			});
			
			$('.pregunta li').on("click",function(){
				$(this).parent().children('li').removeClass('selected');
				$(this).addClass('selected');
				if( pregunta != $('div.pregunta').size()){
					pregunta++;
					cargarPregunta(pregunta);
				}else{
					$('.finalizar').show();
				}
			});
			pregunta =1;
			cargarPregunta(pregunta);
			
			
			
		});/* getJSON*/
		
	}); // ready
	
	function cargarPregunta(pregunta){
		$('.pregunta').hide();
		$('.anterior').show();
		$('.siguiente').hide();
		$('.finalizar').hide();

		$('#pregunta'+pregunta).show();
		$('#numeroPreguntas').text(pregunta + '/'+ $('.pregunta').size());
		$('.cuestionario').css('height',$('#pregunta'+pregunta).height()+100);
		
		if( pregunta == 1){
			$('.anterior').hide();
		}
		if($('#pregunta'+ pregunta + ' li.selected').length > 0){
			if( pregunta == $('div.pregunta').size()){
				$('.finalizar').show();
			}else{
				$('.siguiente').show();
			}
		}
		

	}//cargarPregunta
	
