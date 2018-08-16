$( document ).ready(
	function addWeekBubble() {
		//TODO: jeffwang to add section on how to scroll to the bottom on click
		
		//When user clicks the current week number, show the week drop-up
		$( "#currentWeekCircle" ).click(function() {					
			console.log("clicked to display");
			$("#weekScrollContainer").css('display','block');
		});
		
		//When user selects a week number, hide the week drop-up
		$( "#week13Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
			console.log($('#week13Circle').html());
			
			var prevWeek = $('#currentWeekNum option:selected').val();
			$("#week"+prevWeek+"Circle").css('background-color','transparent');
			
			
			$('#currentWeekNum option[value=13]').attr('selected','selected');
			console.log("new select value chosen, "+$('#currentWeekNum option:selected').val()+", calling updatePage()");
			
			$("#currentWeekCircle").html(13);
			$("#week13Circle").css('background-color','#A0A0A0');
			
			updatePage($("#teamID").val());
			allMatchupsFunction();
		});
		$( "#week12Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week11Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week10Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week9Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week8Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week7Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week6Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week5Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week4Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week3Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week2Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
		});
		$( "#week1Circle" ).click(function() {
			console.log("clicked to hide");
			$("#weekScrollContainer").css('display','none');
			console.log($('#week1Circle').html());
			
			var prevWeek = $('#currentWeekNum option:selected').val();
			$("#week"+prevWeek+"Circle").css('background-color','transparent');
			
			
			$('#currentWeekNum option[value=1]').attr('selected','selected');
			console.log("new select value chosen, "+$('#currentWeekNum option:selected').val()+", calling updatePage()");
			
			$("#currentWeekCircle").html(1);
			$("#week1Circle").css('background-color','#A0A0A0');
			
			updatePage($("#teamID").val());
			allMatchupsFunction();
		});
		

});


var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  b.setAttribute("id", "weekBlock");
  var height = screen.height-185;
  var string = "overflow-y:scroll; height:"+height+"px; max-height:663px; z-index:999";
  console.log(string);
  b.setAttribute("style", string)
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
		console.log("new select value chosen, calling updatePage()");
		updatePage($("#teamID").val());
		allMatchupsFunction();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}


/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);