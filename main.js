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

function getmassinfo(){
  	let itemname = document.getElementById("item-input").value;
  	document.getElementById("generate-info").innerHTML = "Generating...";

	fetch("https://mass-information-rest-api.fishballcloud.repl.co/api/v1/resources/mass?end_point="+itemname)
	.then(response => response.json())
	.then(data => {
    	console.log(data);
      	while (true){
          var multiplier = prompt("Enter Number of trees (1-10000)", "1000");
          multiplier = parseInt(multiplier, 10);
          if (isNaN(multiplier) || multiplier<1 || multiplier>10000){
              var multiplier = prompt("Please enter valid number", "1000");
          }else{
              break
          }
        }
      	
      	if (data.steps=="Invalid Item"){
          
          document.getElementById("mass-ingredients").innerHTML = "This Item is Invalid";
          document.getElementById("mass-instructions").innerHTML = "This Item is Invalid";
          alert("Invalid Item!!!")
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
        
 	 	document.getElementById("generate-info").innerHTML = "Get Recipe";
      	
    });
  	
}

class GrowStocksMassInfobox {
	static createGrowtopiaModal({ modalClass, itemIcon, title, description, content, footerButtons, triggerClass, closeButtonClass }) {
		$(`.${modalClass}`).remove();
		const growtopiaModalCode = `
			<div class="GTModal ${modalClass}" id="MassInfoModal">
				<div class="successBox">
						<div class="header">
								<span class="growsprite"><img src="https://cdn.growstocks.xyz/item/favicon.png" title="Wrench icon" itemsprite></span>&nbsp;&nbsp;&nbsp;<p style="font-family: CenturyGothicBold;font-size: 30px;">${title || "Title goes here"}</p><br/>
								<p>${description || ""}</p>
						</div>
                        <label for="item-input">Find Recipe for an Item</label>
                        <br>
                        <input type="text" id="item-input" placeholder="Enter Item Name" style="color:black"></input>
                        <br><i style="font-size:12px">Results will take awhile to load</i><br>
                        <button id="generate-info" class="growButton" onclick="getmassinfo()">Get Recipe</button>
                        <hr>
						<div class="colorable">
							<h2>Ingredients</h2>
                            <div id="mass-ingredients">Nothing to See here</div>
							<hr>
                            <h2>Steps</h2>
                            <div id="mass-instructions">Nothing to See here</div>
                            <hr>
                            <div style="position: sticky; bottom: 1rem; left: 1rem; background-color: rgba(0,0,0,0.75); padding: 0.5rem; border-radius: 5px;">
                                ${footerButtons || `<button class="growButton ${modalClass}-close growCancelButton">Close</button>`}
                            </div>
						</div>
				</div>
			</div>
		`;
      	console.log("Creating the Mass Info Modal...")
		$("body").append(growtopiaModalCode);
		$(`.${triggerClass}`).on('click', () => GrowStocksMassInfobox.openModalWithClass(modalClass));
		$(`.${closeButtonClass || `${modalClass}-close`}`).on('click', () => GrowStocksMassInfobox.closeModalWithClass(modalClass));
      	console.log("Created Mass Info Modal...\nMade by @Fishball_Noodles")
		
    }

	static closeModalWithClass(modalClass) {
		$("." + modalClass).animate({
			height: "toggle",
		}, 500, function(){
			$(".dark-bg").fadeOut();
		});
	}

	static openModalWithClass(modalClass) {
		$(".dark-bg").fadeIn(function(){
			$("." + modalClass).animate({
				height: "toggle"
			}, 500);
		});
	}

	static removeGrowtopiaModal(modalClass) {
		$(`.${modalClass}`).remove();
	}
}

var mass_info =`
    	<div class="growButton MassInfoTrigger" style="cursor: pointer;background-color: #f56f42;display: flex;align-items: center;justify-content: center;position: fixed;width: 50px;height: 50px;border-radius: 50%;bottom: 1rem;left: 1rem;box-shadow: 0 0 5px rgb(0 0 0 / 65%);z-index: 200;">
		Mass Info</div>
`
$("body").append(mass_info);
GrowStocksMassInfobox.createGrowtopiaModal({ modalClass: "MassInfoModal", triggerClass: "MassInfoTrigger", content: "Mass Information", itemIcon: "EZ Cook Oven", title: "Mass Information", description: "A plugin that calculates Raw Materials needed for an item with steps." });
