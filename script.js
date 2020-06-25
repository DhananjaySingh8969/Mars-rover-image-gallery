function AddImage(imgUrl)
{
    $(".image-container").append(
            '<div class="image"><img src='
               + imgUrl+
            '></div>'
        );
}
function response(data)
{     
    $(".image-container").empty();
    var imageArray=data.photos;
    $(".no-of-res").text("No of Results :"+imageArray.length);
    if(imageArray.length==0)
    {
        $(".image-container").append(
            '<h1 class="error-Message">Sorry:(, Rover was chilling that day</h1>'
        );
        return -1;
    }
     for(let imgData of imageArray)
     {
        AddImage(imgData.img_src);
     }
}
$("#date-input button").click(function(){
       console.log("on add course clicked");
       var date = new Date($('#date-input input').val());
       var day = date.getDate();
       var month = date.getMonth() + 1;
       var year = date.getFullYear();
       var inputDate=year+"-"+month+"-"+day;
       if(date!="Invalid Date")
       {
           console.log(date,day,month,year);
           $.ajax({
                url:"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
                method:"GET",
                success:response,
                data:{
                    api_key:"DEMO_KEY",
                    earth_date:inputDate
                }
            });
       }else{
           alert(date);
       }
       
});