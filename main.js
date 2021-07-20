/**
 * This plugin is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Mass Information Plugin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MARCHABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * @plugin
 * @name Mass Information
 * @version 1.0.0
 * @author Fishball_Noodles#7209
 * @description This plugin will allow you to view the recipes for Any Splicable Item.
 * @endplugin
*/

function getMassInfo(){
  	let itemName = document.getElementById("item-input").value;
  	document.getElementById("generate-info").value = "Generating...";
	document.getElementById("generate-info").disabled = true;
  
	fetch("https://mass-information-rest-api.fishballcloud.repl.co/api/v1/resources/mass?end_point="+itemName)
	.then(response => response.json())
	.then(data => {
      	while (true){
		var multiplier = prompt("How many trees do you want to make (1-10000)", "1000");
		multiplier = parseInt(multiplier, 10);
		if (isNaN(multiplier) || multiplier < 1 || multiplier > 10000){
			var multiplier = alert("The number you've entered was invalid.");
		}else{
			break;
		}
        }
      	
      	if (data.steps == "Invalid Item") {
		document.getElementById("generate-info").disabled = false;
		document.getElementById("mass-ingredients").innerHTML = "This item is invalid";
		document.getElementById("mass-instructions").innerHTML = "This item is invalid";
		alert("The item you provided does not exist or is not spliceable!");
        } else {
          
        	document.getElementById("mass-ingredients").innerHTML = "";
          	for (let i = 0; i < Object.keys(data.ingredients).length; i++) {
        		ele = document.createElement("p");
              	ele.setAttribute("id", Object.keys(data.ingredients)[i]);
              	ele.innerHTML = Object.keys(data.ingredients)[i] +" : "+multiplier*data.ingredients[Object.keys(data.ingredients)[i]];
        		document.getElementById("mass-ingredients").appendChild(ele);
          	}
          
          	document.getElementById("mass-instructions").innerHTML = ""
            for (let i = 0; i < data.steps.length; i++) {
                ele = document.createElement("p");
                ele.setAttribute("id", "step"+i);
                ele.innerHTML = (i+1)+") "+data.steps[i];
                document.getElementById("mass-instructions").appendChild(ele);
            }
        };
        document.getElementById("generate-info").disabled = false;
 	 	document.getElementById("generate-info").value = "Get recipe";
      	
    });
  	
}

if (window.location.pathname == "/splicing") {
    document.title = "Splicing | GrowStocks, the online item price checker for Growtopia"
    $('.gsWrap').html(`
	<style>
		.GTText {
			background: 0 0;
			padding: 5px 10px;
			border: none;
			border-bottom: 3px SOLID #bee8f1;
			box-shadow: #000 0 2px;
		}
            
		.colorable p {
			color: #fce6ba;
			border-bottom-color: #fce6ba;
			font-family: CenturyGothicBold,sans-serif;
			font-size: 22px;
			display: block;
		}
	</style>
	<div class="dashWrap" style="margin-top: 10px">
		<div class="trendRes">
			<div class="itemChipHead">
				<img title="Wrench icon" src="https://cdn.growstocks.xyz/item/favicon.png" alt="Wrench icon" itemsprite>
				<div class="textWrap">
					<h2>Mass Information</h2><br><br>
					<h4>A plugin that calculates the raw materials needed to splice an item with steps.</h4><br><br>
				</div>
				<form class="splicing">
				<h3 style="color:white;">Find the splicing recipe for an item</h3>
				<input type="text" value="" class="GTText" placeholder="Item name" id="item-input" required><br>
				<small><i>Results might take a while to load</i></small><br>
				<input type="submit" class="growButton" id="generate-info" value="Find recipe"><br>
				</form>
				<hr>
				<div class="colorable">
				<h2>Ingredients</h2>
				<div id="mass-ingredients">Nothing to see here yet.</div>
				<hr>
				<h2>Steps</h2>
				<div id="mass-instructions">Nothing to see here yet.</div>
				<hr>
				</div>
			</div>
		</div>
	</div>
    `);
  
  	$("form.splicing").on('submit', function(e){
		e.preventDefault();
		getMassInfo();
	});
} else if (window.location.pathname == "/") {
 	$("h2:contains(Extra features)").parent().parent().after(`
		<div class="dqRes">
			<div class="itemChipHead">
				<img title="Wrench icon" src="https://cdn.growstocks.xyz/item/favicon.png" alt="Wrench icon" itemsprite>	
				<div class="textWrap">
					<h2><a class="itemLink" href="/splicing">Mass Information</a></h2><br>
					<p>A plugin that calculates the raw materials needed to splice an item with steps!</p>
				</div>
			</div>
		</div>
    `); 
}
