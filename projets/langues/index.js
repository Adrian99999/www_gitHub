iframe.onload = function(){
	iframe.style.height = "initial";
	iframe.style.height = iframe.contentDocument.body.scrollHeight + 200 +'px';
	
	var $articles = $("#iframe").contents().find("article");
	for(var i = 0; i<$articles.length; i++)
		{
			console.log($articles[i].firstElementChild); 
			$($articles[i].firstElementChild).before("<button>Basculer affichage</button>");
		}
	
	$("#iframe").contents().find("article").css("position", "relative");
	
	$("#iframe").contents().find("button").css({
		position: 'absolute',
		right: '10px',
		top: '10px',
		borderRadius: '10px',
		width: '100px',
		opacity: '0.5',
		display: 'none',
		fontWeight: 'bold'
	})
	
	$("#iframe").contents().find("button").hover(function(){
		$(this).css("color", "red");
		$(this).filter(':not(:animated)').animate({
						opacity:1
						}, 1000, "linear")
			
		}, function(){
			$(this).animate({
						opacity:0.5,
						}, 1000, "linear", function(){
			$(this).css("color", "black")
		})
			});
	
	$("#iframe").contents().find("button").on("click", function(){
		var $article = $(this).parent();
		
		console.log($article.find("p").text());
//		
//		var $text = $article.find("p").text();
		$article.find("p").fadeToggle("slow", "linear");
		
		$article.find("ol").fadeToggle("slow", "linear");
		//console.log($article);
		
	});
	
}

window.onresize = function(){
	iframe.style.height = "initial";
	iframe.style.height = iframe.contentDocument.body.scrollHeight + 200 +'px';
}

$("<button>Basculer iframe</button>").appendTo($('span')).on("click", ()=>afficherIframe());

function afficherIframe(){
	$(".container").fadeToggle("slow", "linear");
}



$("<button>Basculer paragraphes</button>").appendTo($("span")).on("click", basculerParagraphes);

function basculerParagraphes()
{
	$("#iframe").contents().find("p").fadeToggle("slow", "linear");
	
//	var iframeRoot =iframe.contentDocument;
//	var $p = $("p", iframeRoot);
//	var $p = $(iframeRoot).find("p");
//	var $p = $(iframeRoot.querySelectorAll("p"));
	
//	console.log($p[0])
//	$p.fadeToggle("slow", "linear");
}



$("<button>Basculer boutons</button>").appendTo($("span")).on("click", basculerBoutons);
function basculerBoutons(){
  $("#iframe").contents().find("button").fadeToggle("slow", "linear");
}




