   	var vermelhoErro="#FFAAAA";
    	var verdeAcerto="#AAFFAA";
    	
    	$(document).ready(function(){
    		$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
    		$.ajaxPrefilter( "json script", function( options ) {
    			options.crossDomain = true;
				});
		    // carregarSimuladoJson();
	    	$(".startProva").click(function(){
   				var p = $(this).attr("prova");
 					iniciarProva(p);	
   			});
    	});
    	
    	function responderAtual(){
    		if(opcaoUser()==undefined){
    			alert("Marque uma alternativa.");
    		}else{
    			respostasUser[questaoAtual()-1]=opcaoUser();
    			$("#indicator"+questaoAtual()).html(questaoAtual()+"-"+opcaoUser());
    			
    			if($("#corrigirAlternativa").prop('checked')){
    				if(respostaAtual()==opcaoUser()){
    					$(".item.active").find(".tableAlternativa.active").addClass("bg-success text-success");
    					$("#indicator"+questaoAtual()).css("background-color",verdeAcerto);
    					$(".item.active").find(".questaoStatus").html("Você acertou, parabéns!");
    					
    				}else{
    					$(".item.active").find(".tableAlternativa.active").addClass("bg-danger text-danger");
    					$("#indicator"+questaoAtual()).removeClass("active");
    					$("#indicator"+questaoAtual()).addClass("bg-success text-success");
    					$(".item.active").find(".tableAlternativa").each(function(){
    						if($(this).attr("alternativa")==respostaAtual()){
    							$(this).addClass("bg-success text-success");
    						}
    					});
    					
    					
    					$(".item.active").find(".questaoStatus").html("Você marcou: ("+opcaoUser()+"), mas a alternativa correta é: ("+respostaAtual()+")");
    				}
    				$(".item.active").find(".tableAlternativa").unbind("click");
    				$(".item.active").find(".tableAlternativa.active").removeClass("active");
    				$(".item.active").find(".responder").unbind("click").css("display","none");
    				// $(".item.active").find(".pular").unbind("click").css("display","none");
				
    			}
    			
    			//verificar se fim de prova
    			var fimProva=true;
    			for(var a=0;a<respostasUser.length;a++){
    				if(respostasUser[a]==""){
    					fimProva=false;
    					break;	
    				}
    			}
    			if(fimProva){
    				finalizar();	
    			}
    		}
    	}

	$(".voltarProva").click(function(){
	    			$("#resultadoFinal").hide("slow");
	    			$("#myCarousel").show("slow");
	});
    	
    	function finalizar(){

    		
		atualizarIndice();    		
    		
    		
    		
    			$("#resultadoFinal").show("slow");
    			$("#myCarousel").hide("slow");
			$(".fecharProva").css("display","block");
    	}
    	function iniciarProva(p){
    		carregarSimuladoJson(p);	
    		$("#inicio").css("display","none");
    		$("#myCarousel").show("slow");
    		$(".provaNumero").html("Prova: "+p);
    	}
    
	function navegarPara(n){
		$(".voltarProva").click();
		$('#myCarousel').carousel(n);
	}

	function atualizarIndice(){
    		var erros = 0;
    		var acertos = 0;
    		var percentual = 0;
    		var finalQuestionario = "";
    		
    		for(var a=0; a<respostasUser.length; a++){
			if(respostasUser[a]!=undefined && respostasUser[a]!=''){
	    			if(respostasUser[a]==gabarito[a]){
	    				acertos++;	
	    			}	else {
	    				erros++;	
	    			}			
			}
    			
    			if(respostasUser[a]==gabarito[a]){
    				finalQuestionario+="<div onclick='navegarPara("+a+")' class='text-center col-xs-1 col-sm-1 col-md-1' style='cursor:pointer; height:50px; border:1px solid #bbbbbb; padding:5px;background-color:"+verdeAcerto+"'>"+(a+1)+"<br/>"+respostasUser[a]+"</div>";
    			}else if(respostasUser[a]!=undefined && respostasUser[a]!=''){
    				finalQuestionario+="<div onclick='navegarPara("+a+")' class='text-center col-xs-1 col-sm-1 col-md-1' style='cursor:pointer; height:50px; border:1px solid #bbbbbb; padding:5px;background-color:"+vermelhoErro+"'>"+(a+1)+"<br/>"+respostasUser[a]+"</div>";
    			}else{
				finalQuestionario+="<div onclick='navegarPara("+a+")' class='text-center col-xs-1 col-sm-1 col-md-1' style='cursor:pointer; height:50px; border:1px solid #bbbbbb; padding:5px;background-color:#cccccc'>"+(a+1)+"<br/>"+respostasUser[a]+"</div>";
			}
    		}

		percentual = acertos*100 / respostasUser.length;
    		
    		$(".erros").html("Questões erradas: "+erros);
    		$(".acertos").html("Questões certas: "+acertos);
    		$(".percentual").html("Percentual: "+percentual+" %");
    		$(".finalQuestionario").html(finalQuestionario);

	}    	

    	function setInterfaceHandlers(){
    		
 	    	$(".tableAlternativa").click(function(){
			    $(".tableAlternativa").each(function () {
			        $(this).removeClass("active");
			    });
			    $(this).addClass("active");	    		
	    	});
 
		    $(".responder").click(function(){
		    	responderAtual();
		    });
		    
		    $(".pular").click(function(){
		    	$(".right").click();
		    });   		
		    
		  $(".reiniciar").click(function(){
		    	location.reload();
		    });

		$(".fecharProva").click(function(){
			atualizarIndice();
   			$("#resultadoFinal").show("slow");
    			$("#myCarousel").hide("slow");
		});
    	}
    	
    	function respostaAtual(){
    		return 	$(".item.active").find(".questao").attr("resposta");
    	}
    	
    	function questaoAtual(){
    		return 	$(".item.active").find(".questao").html();
    	}
    	
    	function opcaoUser(){
    		return $(".item.active").find(".tableAlternativa.active").attr("alternativa");
    	}
    	
			var gabarito=[];
			var respostasUser=[];
			
			function carregarSimuladoJson(num){
				/*
				$.ajax({
				    type: "GET",
				    url: "./provaWeb1.json",
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",    
				    success: function(data) {
				        //console.log(data);
				        console.log( "second success" );
				    		parseProva(data);
				    		setInterfaceHandlers();
				    },
				    error: function(textStatus, errorThrown) {
				        alert("Error: " + textStatus + " errorThrown: " + errorThrown);
				    }
				});
				*/
				/**/
				var jsonCompleto;
				if(num==1)
					jsonCompleto=$("#provaWeb1").html();
				else if(num==2)
					jsonCompleto=$("#provaWeb2").html();
				else if(num==3)
					jsonCompleto=$("#provaWeb3").html();
				else if(num==4)
					jsonCompleto=$("#provaWeb4").html();
					
				parseProva(jsonCompleto);
		    setInterfaceHandlers();
				/**/
				/*
				var jqxhr = $.getJSON( "./provaWeb1.json", function() {
				  console.log( "success" );
				})
				  .done(function() {
				    console.log( "second success" );
				    parseProva(jqxhr.responseText);
				    setInterfaceHandlers();
				  })
				  .fail(function() {
				    console.log( "error" );
				  })
				  .always(function() {
				    console.log( "complete" );
				  });	
				 */		
			}
			
			function parseProva(dados){
				var json = jQuery.parseJSON( dados );
				//var json = dados;
				var block = "";
				var active="active";
				for(var a=0; a<json.prova.questoes.length; a++){
					if(a>0){active="";}
					block+='<div class="item '+active+'">';
					block+='	<div class="container-fluid">                              ';
					block+='		<div class="questao" resposta="'+json.prova.questoes[a].resposta+'" style="display:none">'+json.prova.questoes[a].numero+'</div>';
					block+='	  <div class="carousel-caption" style="top:0px">';
					block+='	  	<h5 class="text-left">Questão '+json.prova.questoes[a].numero+':</h5>';
					block+='	    <h5 class="bg-primary text-left" style="padding:10px">              	';
					block+='	    	'+json.prova.questoes[a].enunciado;
					block+='			</h5>';
					block+='			<table class="table table-condensed">';
					for(var b=0;b<json.prova.questoes[a].alternativas.length;b++){
						block+='				<tr class="tableAlternativa" alternativa="'+json.prova.questoes[a].alternativas[b].alt+'"><td><h5 class="text-left"><b>'+json.prova.questoes[a].alternativas[b].alt+')</b> '+json.prova.questoes[a].alternativas[b].texto+'</h5></td></tr>	    ';
					}
					block+='			</table>';
					block+='			<div class="row ">';
					block+='	    		 <div class="col-xs-4 col-sm-4 col-md-4 text-center"><a class="btn btn-primary fecharProva" href="#" role="button">Indice</a></div>';
					block+='				 	 <div class="col-xs-4 col-sm-4 col-md-4 text-center"><a class="btn btn-warning responder" href="#" role="button">Responder</a></div>';
					block+='	    		 <div class="col-xs-4 col-sm-4 col-md-4 text-center"><a class="btn btn-primary pular" href="#" role="button">Próxima</a></div>';
					block+='			</div>        ';      
					block+='	  </div>';
					block+='	</div>';
					block+='</div>		';
					
					$(".carousel-inner").append(block);
					block="";
					block='<a href="#" id="indicator'+(a+1)+'" data-target="#myCarousel" data-slide-to="'+a+'" class="'+active+' col-md-1" style="color:black;border:1px solid gray;padding:5px">'+(a+1)+'</a>';
					$(".carousel-indicators").append(block);
					block="";
					
					gabarito.push(json.prova.questoes[a].resposta);
					respostasUser.push("");
				}
			}