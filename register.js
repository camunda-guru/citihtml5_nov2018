window.addEventListener('load',function()
{
    if(navigator.geolocation)
    {

        navigator.geolocation.getCurrentPosition(success,failure);
    }

    function success(position)
    {
        alert("Geo Available");
       alert(position.coords.latitude);
       alert(position.coords.longitude);
        var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({latLng: latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                if (results[1]) {
                    var arrAddress = results;
                    console.log(results);
                    i=0;
                    addressref.value="";
                    for(var address in arrAddress )
                    {

                        console.log(arrAddress[address]);
                        if (i==1)
                        {
                            //console.log(arrAddress[address]);
                            // if (arrAddress[address].types[0] == "locality") {
                            addressref.value= arrAddress[address].formatted_address;
                            console.log("City: " + arrAddress[address].formatted_address);
                            itemLocality = arrAddress[address].address_components[0].long_name;
                            console.log( itemLocality );
                            // }
                        }
                        i++;
                    }



                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });

        googleloc = new google.maps.LatLng
        (position.coords.latitude,position.coords.longitude);

        //alert(googleloc);
        var mapoptions={
            center:googleloc,
            zoom:15,
            mapTypeId:google.maps.MapTypeId.SATELLITE,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeControl:true,
            mapTypeControlOptions:google.maps.MapTypeControlStyle.DEFAULT

        };

        var gmaparea=document.getElementById("mapArea");
        gmap = new google.maps.Map(gmaparea,mapoptions);
        marker = new google.maps.Marker
        ({
            position:googleloc,
            map:gmap,
            title:"I am Here"

        });
        // alert("done");
    }

    function failure(error)
    {
        document.write(error);
    }

})