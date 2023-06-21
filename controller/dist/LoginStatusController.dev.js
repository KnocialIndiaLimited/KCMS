"use strict";

var _require = require('../module/LoginStatus'),
    LoginStatus = _require.LoginStatus;

var counterSchema = require('../module/counter');

var dateZone = require('../dateZone');

var moment = require('moment');

var covert = require('../Converttime');

var convert = require('../Converttime');

var addLoginStatus = function addLoginStatus(rpt_id, name, date, loginTime, ipAddress) {
  LoginStatus.findOne({
    rpt_id: rpt_id,
    date: dateZone.datezone
  }).then(function (User) {
    // console.log(User.shift[0].shift_start)
    if (User) {
      console.log(User);
    } else {
      counterSchema.findOneAndUpdate({
        id: "loginStatus_seq"
      }, {
        "$inc": {
          "seq": 1
        }
      }, {
        "new": true
      }, function (err, cd) {
        var seqId;

        if (cd == null) {
          var newval = new counterSchema({
            id: "loginStatus_seq",
            seq: 1
          });
          newval.save();
          seqId = 1;
        } else {
          seqId = cd.seq;
        }

        var loginstatus = new LoginStatus({
          _id: seqId,
          rpt_id: rpt_id,
          name: name,
          date: date,
          loginTime: loginTime,
          ipAddress: ipAddress,
          created_at: Date.now()
        });
        loginstatus.save(function (err, docs) {
          if (!err) {
            console.log(docs);
          } else {
            console.log(err);
          }
        });
      });
    }
  });
};

var getAllLoginStatus = function getAllLoginStatus(req, res) {
  LoginStatus.find(function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
};

var getAllLoginStatusById = function getAllLoginStatusById(req, res) {
  var getId = req.params.id;
  var data;
  var array = [];
  LoginStatus.find({
    rpt_id: getId
  }, function (err, docs) {
    if (!err) {
      docs.map(function (x) {
        var colorData;
        var text;

        if (x.totalActive) {
          if (x.totalActive < 14400) {
            x.name = 'A  (' + convert(x.totalActive) + ')';
            colorData = '#FF0000';
          } else if (x.totalActive >= 14400 && x.totalActive < 25200) {
            x.name = 'P/2  (' + convert(x.totalActive) + ')';
            colorData = '#FFFF00';
            text = '#000000';
          } else if (x.totalActive >= 25200 && x.totalActive < 28800) {
            x.name = 'P/3  (' + convert(x.totalActive) + ')';
            colorData = '#FFC0CB';
            text = '#FF0000';
          } else {
            x.name = 'P  (' + convert(x.totalActive) + ')';
            colorData = '#00FF00';
            text = '#FF0000';
          }
        } else {
          x.name = 'A';
          colorData = '#FF0000';
        }

        x.date = moment(x.date).format('YYYY-MM-DD');
        data = {
          title: x.name,
          date: x.date,
          color: colorData,
          textColor: text,
          display: 'block'
        };
        array.push(data);
      });
      res.json(array); //   var date=moment(docs.date).format('YYYY-MM-DD')
      //    data={
      //     title:docs.name,
      //     date:date,
      //     color:'6598'
      //    }
      //    console.log(docs)
    } else {
      res.json(err);
    }
  });
};

var getPersonalLoginStatusById = function getPersonalLoginStatusById(req, res) {
  var getId = req.params.id;
  var array = [];
  LoginStatus.find({
    rpt_id: getId
  }, function (err, docs) {
    if (!err) {
      docs.map(function (x) {
        x.totalActive = convert(x.totalActive);
      });
      res.json(docs);
    } else {
      res.json(err);
    }
  });
};

var getTotalActiveById = function getTotalActiveById(req, res) {
  var getId = req.params.id;
  var array = [];
  LoginStatus.find({
    rpt_id: getId
  }, function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
};

var deleteLoginStatus = function deleteLoginStatus(req, res) {
  var deleteid = req.params.id;
  LoginStatus.findByIdAndDelete(deleteid, function (err, del) {
    if (!err) {
      res.json(del);
    } else {
      res.json(err);
    }
  });
};

var updateLoginStatus = function updateLoginStatus(req, res) {
  var getId = req.params.id;
  var getDate = dateZone.datezone;
  var getcurentdate = new Date();
  var dateUTC = getcurentdate.getTime();
  var dateIST = new Date(dateUTC);
  dateIST.setHours(dateIST.getHours() + 5);
  dateIST.setMinutes(dateIST.getMinutes() + 30);
  LoginStatus.findOneAndUpdate({
    rpt_id: getId,
    date: getDate
  }, {
    lastActive: dateIST,
    totalActive: req.body.totalActive,
    logout: req.body.logout,
    break1DateTime: req.body.break1DateTime,
    break2DateTime: req.body.break2DateTime,
    break3DateTime: req.body.break3DateTime,
    totalIdle: req.body.totalIdle
  }, function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
}; // const updateLoginStatus=(req,res)=>{
//     console.log(req.params.id)
//     LoginStatus.findOneAndUpdate({rpt_id:req.params.id},(err,result)=>{
//         console.log(result)
//     }
//{
//       logout:req.body.logout,
//             break1DateTime:req.body.break1DateTime,
//             break2DateTime:req.body.break2DateTime,
//             break3DateTime:req.body.break3DateTime,
//     lastActive:req.body.lastActive, 
//     totalActive:req.body.totalActive,
//     totalIdle:req.body.totalIdle,
//     ActivityData:[],
//     updated_at:Date.now()
// },(docs,err)=>{
//     if(!err){
//         res.json(docs);
//     }
//     else{
//         res.json(err);
//     }
//}
//}


module.exports = {
  addLoginStatus: addLoginStatus,
  getAllLoginStatus: getAllLoginStatus,
  getAllLoginStatusById: getAllLoginStatusById,
  deleteLoginStatus: deleteLoginStatus,
  updateLoginStatus: updateLoginStatus,
  getPersonalLoginStatusById: getPersonalLoginStatusById,
  getTotalActiveById: getTotalActiveById
};