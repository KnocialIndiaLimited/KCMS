
 var newDate=new Date()
 
 let date = ("0" + newDate.getDate()).slice(-2);

 // current month
 let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
 
 // current year
 let year = newDate.getFullYear();
 

 Customdate=year+"/"+month+"/"+date+1




module.exports={Customdate}