homeApp.controller('RegistrationController',['$scope','CountryService',function($scope,CountryService)
{
//model
    $scope.user={
        firstName:'',
        lastName:'',
        dob:'',
        address:'',
        country:'',
        email:'',
        gender:'',
        profilePhoto:''
    }

    //read data from service
    CountryService.countryServiceObj().then(function(response)
    {
        console.log(response.data);
        $scope.countryData=response.data;
        //$scope.borders=response.data.borders;
        //console.log($scope.borders);
    })





    //function
    $scope.save=function()
    {

        $scope.user.profilePhoto=window.localStorage.getItem("file0");
        console.log($scope.user);
    }

    $scope.showphoto=function()
    {


        var previewRef=document.getElementById("preview");
        var btn = document.getElementById('btnshow');
        var img =new Image();
        if(window.localStorage.getItem("file0")!=undefined) {
            img.src = window.localStorage.getItem("file0");
            img.width = 100;
            img.height = 100;

            img.onload = function () {
                previewRef.appendChild(img);
                btn.disabled=true;
            }
        }
    }


}])


function upload()
{
    //alert("Image Loading....");
   var fileType=/image.*/;
   var fileRef=document.getElementById("profilePhoto");
   //alert(fileRef.files.length);
   for(var i=0;i<fileRef.files.length;i++) {
       if (fileRef.files[i].type.match(fileType)) {
            store(i,fileRef.files[i]);

       }
    }




}


function store(position,file)
{

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(evt)
    {
        window.localStorage.setItem("file"+position,evt.target.result);
    }


}