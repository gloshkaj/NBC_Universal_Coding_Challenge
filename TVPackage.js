/* 
TESTS FOR DEVICES:
1. Say you have 2 devices and you want to watch video simultaneously on 2 devices for 4 hours.
The recommendation should be 5 GB which comes out to $8 as per the table above.
2. Say you have 3 additional devices (so a total of 5 devices at home) and you want the ability to watch
videos simultaneously on 3 devices for 4 hours. The recommendation should be:
5 GB (2 devices at 4 hours of streaming)
+
3 GB (3 additional devices)
+
1 GB (Streaming on 1 additional device). 
The recommendation should be 9GB which would be $15.50 as per the table above.
3. Say you have 4 additional devices (so a total of 6 devices at home) and you want the ability to watch
videos simultaneously on 4 devices for 12 hours. The recommendation should be:
12 GB (2 devices at 12 hours of streaming)
+
4 GB (4 additional devices)
+
2 GB (Streaming on 2 additional devices). 
The recommendation should be 18GB which would be $20.00 as per the table above.
TESTS FOR PHONE SERVICES:
1. Say you have a phone service and don't want to make
international calls. Then the total for phone services should be $25.99.
2. Say you have a phone service and want to call everywhere in the world.
Then the cost for phone services should be 25.99 + 11.99 = $37.98
3. Say you have a phone service and only want to call Asia and Europe.
Then the total cost would be 25.99 + 4.99 + 4.99 = 35.97;
TESTS FOR TOTAL COST:
1. Total cost for Devices(1) and Phone Services(2) should be 8.00 + 37.98 = $45.98.
2. Total cost for Devices(3) and Phone Services(1) should be 20.00 + 25.99 = $45.99.
3. Total cost for Devices(2) and Phone Services(3) should be 15.50 + 35.97 = $51.47.
*/
/* 
Internet usage chart:
Hours of Video Streaming Data Recommended in GB Cost
1                             1                 $3
>2, <=3                       2                 $5
>3, <=5                       5                 $8
>5, <=8                       8                 $15
*/
/*
If more than 8 hours:
8 + (1 GB for every additional 1hr above 8hrs)
$15 + ($1 for every additional 2 GB above 8 GB) 
*/
$(document).ready(function()
{
	// results div is disabled when the page loads.
	// Clicking on radio buttons and check boxes should HIDE the results div.
	"use strict";
	document.getElementById("package").style.display = "none";
	// Each click will enable/disable the appropriate elements.
	// This gets called when the user decides not to have a phone service.
	$('#phoneServiceNo').click(function()
	{
		document.getElementById("intCallYes").disabled = true;
		document.getElementById("intCallNo").disabled = true;
		document.getElementById("intCallYes").checked = false;
		document.getElementById("intCallNo").checked = false;
		document.getElementById("World").disabled = true;
		document.getElementById("Asia").disabled = true;
		document.getElementById("RestWorld").disabled = true;
		document.getElementById("Europe").disabled = true;
		document.getElementById("World").checked = false;
		document.getElementById("Asia").checked = false;
		document.getElementById("RestWorld").checked = false;
		document.getElementById("Europe").checked = false;
		document.getElementById("package").style.display = "none";
	});
	// This gets called when the user decides to include a phone service
	$('#phoneServiceYes').click(function()
	{
		document.getElementById("intCallYes").disabled = false;
		document.getElementById("intCallNo").disabled = false;
		document.getElementById("package").style.display = "none";
	});
	// This gets called when the user decides not to include international calls with a phone service.
	$('#intCallNo').click(function()
	{
		document.getElementById("World").disabled = true;
		document.getElementById("Asia").disabled = true;
		document.getElementById("RestWorld").disabled = true;
		document.getElementById("Europe").disabled = true;
		document.getElementById("World").checked = false;
		document.getElementById("Asia").checked = false;
		document.getElementById("RestWorld").checked = false;
		document.getElementById("Europe").checked = false;
		document.getElementById("package").style.display = "none";
	});
	// This gets called when the user decides to include international calls with a phone service.
	$('#intCallYes').click(function()
	{
		document.getElementById("World").disabled = false;
		document.getElementById("Asia").disabled = false;
		document.getElementById("RestWorld").disabled = false;
		document.getElementById("Europe").disabled = false;
		document.getElementById("package").style.display = "none";
	});
	// This gets called if the user decides to call everywhere in the world.
	// All other checkboxes should be DISABLED in this case.
	$('#World').click(function()
	{
		disableRest(this);
		document.getElementById("package").style.display = "none";
	});
	// Reloads the page
	$('#reset').click(function()
	{
		location.reload();
	});
	// This gets called when the user submits their choices.
	$('#submitChoices').click(function()
	{
		// Hours of streaming
		var hours = document.getElementById("videoStreamingHours").value;
		// Total # of devices
		var devices = document.getElementById("numDevices").value;
		// # of devices for simultaneous play.
		var simDevices = document.getElementById("simultaneousDevices").value;
		// If the user did not enter valid data alert an error message and try again
		if (hours.trim() === ""  || hours < 1 || devices.trim() === "" || devices < 1 || simDevices.trim() === "" || simDevices < 1 || parseInt(simDevices) > parseInt(devices))
		{
			alert("You did not enter valid data. Check your inputs and try again!");
			return;
		}
		// If phone service radio buttons are unchecked tell the user they didn't select an option of whether to include a phone service.
		if (!$('#phoneServiceYes').is(':checked') && !$('#phoneServiceNo').is(':checked'))
		{
			alert("Must decide if you have a phone service or not!");
			return;
		}
		// Phone service cost
		var phoneServiceRate = 0;
		// If the user decided to include a phone service, do the below. Otherwise, there is no cost for phone service.
		if ($('#phoneServiceYes').is(':checked'))
		{
			// Report error and stop if the user did not decide whether they want to make international
			// calls on their phone service.
			if (!$('#intCallYes').is(':checked') && !$('#intCallNo').is(':checked'))
			{
				alert("Must decide if you want to make international calls or not!");
				return;
			}
			// If the user did not include international calling, the phone service rate would be 25.99
			if ($('#intCallNo').is(':checked'))
			{
				phoneServiceRate = 25.99;
			}
			// User included international calling. Follow the below tasks
			else
			{
				phoneServiceRate = 25.99;
				// If the user selected all three of 'Asia', 'Europe', and 'Rest of World', it counts as World.
				var isAllSelected = $('#Asia').is(':checked') && $('#Europe').is(':checked') && $('#RestWorld').is(':checked');
				if ($('#World').is(':checked') || isAllSelected)
				{
					// In this case there would be an 11.99 flat rate.
					phoneServiceRate += 11.99;
				}
				else
				{
					// For each checked option, add 4.99 to the service rate.
					if ($('#Asia').is(':checked'))
					{
						phoneServiceRate += 4.99;	
					}
					if ($('#Europe').is(':checked'))
					{
						phoneServiceRate += 4.99;
					}
					if ($('#RestWorld').is(':checked'))
					{
						phoneServiceRate += 4.99;
					}
				}
			}
		}
		// Amount of GB to recommend
		var recommendedData = 0;
		// Cost of recommended data.
		var dataCost = 0;
		// If the user has at most 2 devices, use the chart to get the cost and recommended data.
		if (devices <= 2)
		{
			if (hours === 1)
			{
				recommendedData = 1;
				dataCost = 3;
			}
			else if (hours <= 3)
			{
				recommendedData = 2;
				dataCost = 5;
			}
			else if (hours <= 5)
			{
				recommendedData = 5;
				dataCost = 8;
			}
			else if (hours <= 8)
			{
				recommendedData = 8;
				dataCost = 15;
			}
			else
			{
				var tmpHours = 8;
				recommendedData = 8;
				dataCost = 15;
				// For each hour above 8, add $0.50 to the cost of the data and an additional GB to the cost.
				while (tmpHours < hours)
				{
					// Must include this in case the user does not provide an integer # of hours.
					if (tmpHours + 1 > hours)
					{
						break;
					}
					recommendedData++;
					dataCost += 0.5;
					tmpHours++;
				}
			}
		}
		// Else the user has more than two devices.
		else
		{
			// Each device over 2 counts as additional.
			var additionalDevices = devices - 2;
			var streamDevices = 0;
			// If we have more than two devices of simultaneous play, 
			if (simDevices > 2)
			{
				streamDevices = simDevices - 2;
				recommendedData += streamDevices;
			}
			// then we add the result of 'additionalDevices' + 'simDevices' - 2.
			recommendedData += additionalDevices;
			// We increment the recommended data based on the earlier chart.
			if (hours === 1)
			{
				recommendedData += 1;
			}
			else if (hours <= 3)
			{
				recommendedData += 2;
			}
			else if (hours <= 5)
			{
				recommendedData += 5;
			}
			else if (hours <= 8)
			{
				recommendedData += 8;
			}
			else
			{
				var tmpHoursAd = 8;
				recommendedData += 8;
				while (tmpHoursAd < hours)
				{
					if (tmpHoursAd + 1 > hours)
					{
						break;
					}
					recommendedData++;
					tmpHoursAd++;
				}
			}
			// Calculate the data cost for the resulting data recommendation based on the chart.
			if (recommendedData <= 1)
			{
				dataCost += 3;
			}
			else if (recommendedData <= 2)
			{
				dataCost += 5;
			}
			else if (recommendedData <= 5)
			{
				dataCost += 8;
			}
			else if (recommendedData <= 8)
			{
				dataCost += 15;
			}
			else
			{
				var tmpData = 8;
				dataCost += 15;
				while (tmpData < recommendedData)
				{
					tmpData++;
					dataCost += 0.5;
				}
			}
		}
		// The total cost would be the sum of the internet usage cost and the phone service cost.
		var totalCost = (phoneServiceRate + dataCost).toFixed(2);
		// UNHIDE the results div and animate the results to the screen.
		// NOTE: Must be formatted to two decimal places because the costs are in currency notation.
		document.getElementById("package").style.display = "block";
		document.getElementById("data").innerHTML = recommendedData + " GB";
		document.getElementById("dataCost").innerHTML = "$" + dataCost.toFixed(2);
		document.getElementById("phoneServiceCost").innerHTML = "$" + phoneServiceRate.toFixed(2);
		document.getElementById("total").innerHTML = "$" + totalCost;
	});
	// Disables 'World' button if any of these is checked, enables it otherwise.
	$('#Asia, #Europe, #RestWorld').click(function()
	{
		if (!$('#Asia').is(':checked') && !$('#RestWorld').is(':checked') && !$('#Europe').is(':checked'))
		{
			document.getElementById("World").disabled = false;
		}
		else
		{
			document.getElementById("World").disabled = true;
		}
	});
	// Disables every checkbox other than 'World' when 'World' is checked.
	function disableRest(checkType)
	{
		var checkName = document.getElementsByName(checkType.name);
		var check = document.getElementById(checkType.id);
		var i = 0;
		if (check.checked)
		{
			for (i = 0; i < checkName.length; i++)
			{
				if (!checkName[i].checked)
				{
					checkName[i].disabled = true;
				}
				else
				{
					checkName[i].disabled = false;
				}
			}
		}
		else
		{
			for (i = 0; i < checkName.length; i++)
			{
				checkName[i].disabled = false;
			}
		}
	}
}				 
);