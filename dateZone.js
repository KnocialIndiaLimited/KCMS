const moment = require("moment/moment");

 var date=new Date()
//  const datezone=moment(date).format('YYYY/MM/DD');

//  .toLocaleString('en-US', {
//      timeZone: 'Asia/Calcutta'
//  })


 var datezone=new Date()
 datezone.setHours(datezone.getHours()+5)
 datezone.setMinutes(datezone.getMinutes()+30)

// function convertUtcToIst(utcDate) {
//     const options = {
//       timeZone: 'Asia/Kolkata',
//       hour12: false,
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     };
  
//     return new Date(utcDate).toLocaleString('en-IN', options);
//   }
  
//   // Example usage:
//   const utcDate =new Date(); // UTC date in ISO 8601 format
//   const istDate = convertUtcToIst(utcDate);





module.exports={datezone}