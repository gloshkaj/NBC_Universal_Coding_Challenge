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
$(document).ready(function()
{
	"use strict";
	document.getElementById("package").style.display = "none";
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
	});
	$('#phoneServiceYes').click(function()
	{
		document.getElementById("intCallYes").disabled = false;
		document.getElementById("intCallNo").disabled = false;
	});
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
	});
	$('#intCallYes').click(function()
	{
		document.getElementById("World").disabled = false;
		document.getElementById("Asia").disabled = false;
		document.getElementById("RestWorld").disabled = false;
		document.getElementById("Europe").disabled = false;
	});
	$('#World').click(function()
	{
		disableRest(this);
	});
	$('#reset').click(function()
	{
		location.reload();
	});
	$('#submitChoices').click(function()
	{
		var hours = document.getElementById("videoStreamingHours").value;
		var devices = document.getElementById("numDevices").value;
		var simDevices = document.getElementById("simultaneousDevices").value;
		console.log(hours.trim() + devices.trim() + simDevices.trim());
		if (hours.trim() === ""  || hours < 1 || devices.trim() === "" || devices < 1 || simDevices.trim() === "" || simDevices < 1 || parseInt(simDevices) > parseInt(devices))
		{
			alert("You did not enter valid data. Check your inputs and try again!");
			return;
		}
		if (!$('#phoneServiceYes').is(':checked') && !$('#phoneServiceNo').is(':checked'))
		{
			alert("Must decide if you have a phone service or not!");
			return;
		}
		var phoneServiceRate = 0;
		if ($('#phoneServiceYes').is(':checked'))
		{
			if (!$('#intCallYes').is(':checked') && !$('#intCallNo').is(':checked'))
			{
				alert("Must decide if you want to make international calls or not!");
				return;
			}
			if ($('#intCallNo').is(':checked'))
			{
				phoneServiceRate += 25.99;
			}
			else
			{
				phoneServiceRate = 25.99;
				var isAllSelected = $('#Asia').is(':checked') && $('#Europe').is(':checked') && $('#RestWorld').is(':checked');
				if ($('#World').is(':checked') || isAllSelected)
				{
					phoneServiceRate += 11.99;
				}
				else
				{
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
		var recommendedData = 0;
		var dataCost = 0;
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
				while (tmpHours < hours)
				{
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
		else
		{
			var additionalDevices = devices - 2;
			console.log(additionalDevices);
			var streamDevices = 0;
			if (simDevices > 2)
			{
				streamDevices = simDevices - 2;
				console.log(streamDevices);
				recommendedData += streamDevices;
			}
			console.log(recommendedData);
			recommendedData += additionalDevices;
			console.log(recommendedData);
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
		var totalCost = (phoneServiceRate + dataCost).toFixed(2);
		console.log(recommendedData + " GB -> $" + dataCost.toFixed(2) + " + $" + phoneServiceRate.toFixed(2) + " = $" + totalCost);
		document.getElementById("package").style.display = "block";
		document.getElementById("data").innerHTML = recommendedData + " GB";
		document.getElementById("dataCost").innerHTML = "$" + dataCost.toFixed(2);
		document.getElementById("phoneServiceCost").innerHTML = "$" + phoneServiceRate.toFixed(2);
		document.getElementById("total").innerHTML = "$" + totalCost;
	});
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