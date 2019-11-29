var params = (new URL(document.location)).searchParams;
apikey = params.get("apikey");

//Location ids as per accuweather
let locations = 
			{
				"India" :
				{
					"Bengaluru" : "204108",
					"Pune" : "204848",
					"Kolkata" : "206690",
					"Delhi" : "202396",
					"Mumbai" : "204842"
				},
				"US" :
				{
					"San Diego" : "347628",
					"Washing DC" : "327659",
					"San Jose" : "347630",
					"Chicago" : "348308",
					"New York" : "349727"
				},
				"UK" :
				{
					"London" : "328328",
					"Liverpool" : "330510",
					"Manchester" : "329260",
					"Bangor" : "325027",
					"Armagh" : "321682"
				},
				"China" :
				{
					"Shanghai" : "106577",
					"Beijing" : "101924",
					"Shenzhen" : "58194",
					"Tianjin" : "106780",
					"Chengdu" : "106774"
				},
				"Russia" :
				{
					"Moscow" : "294021",
					"Kazan" : "295954",
					"Samara" : "290396",
					"Sochi" : "293687",
					"Ufa" : "292177"
				},



			}

$('document').ready(function(){
	country = Object.keys(locations)
    for(let x in country){
    	$(".sidebar").append('<p class=sidebarcountry id='+country[x]+' onclick="getTemp(this.id)"><strong>'+country[x]+'</strong></p>')
    }
});

async function getTemp(e) {
	$(".sidebar p").removeClass("active")
	$("#"+e).addClass("active")
	$("#notify").hide()
	count = 0 
    keys = Object.keys(locations[e])
    for(let x in keys){
    	$("#temprow").append('<div class="col-4 citygrid"><p id=city_'+count+'></p><small><span id=tempcity_'+count+'></span></small></div>')
    	key = keys[x]
    	// console.log(locations[e][key])
 		$("#city_"+count).text(keys[x])
 		await fetchData(locations[e][key]).then((data) => {
 			// console.log(data[0].Temperature.Metric.Value)
 			$("#tempcity_"+count).text("Current : "+String(data[0].Temperature.Metric.Value)+"C / Min : "+String(data[0].TemperatureSummary.Past24HourRange.Minimum.Metric.Value)+"C / Max : "+String(data[0].TemperatureSummary.Past24HourRange.Maximum.Metric.Value) +" C")
 		}).catch((e) => {
 			console.log(e)
 		})
 		count += 1
    }
}

function fetchData(locationid){
	return fetch("http://dataservice.accuweather.com/currentconditions/v1/"+locationid+"?apikey="+apikey+"&language=en-US&details=true").then((res) => res.json()).then((data) => {
		return data
	}).catch((e) => {
		console.log(e)
	})
}