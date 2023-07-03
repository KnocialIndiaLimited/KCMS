"use strict";

var _require = require('../module/user'),
    user = _require.user;

var counterSchema = require('../module/counter');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var connection = require('../db');

var _require2 = require('../data'),
    tokenPrivacy = _require2.tokenPrivacy;

var _require3 = require('express-validator'),
    body = _require3.body;

var _require4 = require('../getCurrentTime'),
    getCurrentTime = _require4.getCurrentTime;

var _require5 = require('./LoginStatusController'),
    addLoginStatus = _require5.addLoginStatus;

var _require6 = require('../dateZone'),
    datezone = _require6.datezone;

var _require7 = require('../module/LoginStatus'),
    LoginStatus = _require7.LoginStatus;

var convert = require('../Converttime'); // const { user } = require('../auth');
// const nodemailer= require('nodemailer');
// const randomstring =require('randomstring');
// const config =require('../config/config');
// const sendResetPasswordMail=async(email,token)=>{
//     try{
//     const transporter= nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:config.emailUser,
//             pass: config.emailPassword
//         }
//             // host: 'smtp.gmail.com',
//             // port: 465,
//             // secure: true,
//             // providerauth: {
//             //     user: config.emailUser,
//             //     pass: config.emailPassword,
//             // },
//       })
//       const mailOptions ={
//         from:config.emailUser,
//         to:email,
//         subject:'For reset Password',
//         html:'<p> Hii '+Email+',Please copy the link <a href="http://localhost:3000/user/forget-password?token='+token+'">and reset your password </a>'
//       }
//       transporter.sendMail(mailOptions,function(error,info){
//         if(error){
//             console.log(error);
//         }
//         else{
//             console.log("mail has been sent :-" ,info.response);
//         }
//       })
//     }
//     catch (error){
//        console.log(error)
//     }
// }


var checkToken = function checkToken(req, res) {
  return res.status(200).json({
    message: "true"
  });
};

var register = function register(req, res) {
  var email = req.body.email;
  user.findOne({
    email: email
  }).then(function (registerUser) {
    if (registerUser == null) {
      bcrypt.hash(req.body.password, 10, function (err, hasspass) {
        if (err) {
          res.json(err);
        }

        counterSchema.findOneAndUpdate({
          id: "user_seq"
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
              id: "user_seq",
              seq: 1
            });
            newval.save();
            seqId = 1;
          } else {
            seqId = cd.seq;
          }

          var User = new user({
            _id: seqId,
            rpt_id: req.body.rpt_id,
            username: req.body.user_name,
            email: req.body.email,
            password: hasspass,
            phone_no: req.body.phone_no,
            role: req.body.roles,
            status: req.body.status,
            shift: req.body.shift,
            department: req.body.department,
            designation: req.body.designation,
            sub_department: req.body.sub_department,
            office_location: req.body.office_location
          });
          User.save(function (err, doc) {
            if (!err) {
              res.send(doc);
            } else {
              res.send(err);
            }
          });
        });
      });
    } else {
      res.json({
        message: "user already registered"
      });
    }
  });
};

var count = function count(req, res) {
  user.count({
    username: "akash"
  }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

var login = function login(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var height = req.body.height;
  var width = req.body.width;
  var ipAddress = req.body.ipAddress;
  var lat = req.body.lat;
  var lng = req.body.lng;
  console.log(lat);
  console.log(lng);
  console.log(ipAddress);

  if (width >= 1000 && height >= 250) {
    user.findOne({
      email: email
    }).then(function (User) {
      // console.log(User.shift[0].shift_start)
      if (User) {
        if (User.status == false) {
          bcrypt.compare(password, User.password, function (err, result) {
            if (err) {
              console.log(err);
            }

            if (result) {
              if (User.role == 'admin' || User.role == 'nadmin') {
                var token = jwt.sign({
                  email: User.email,
                  username: User.username,
                  role: User.role,
                  id: User._id,
                  rpt_id: User.rpt_id
                }, tokenPrivacy, {
                  expiresIn: '9h'
                });
                var refreshToken = jwt.sign({
                  email: User.email
                }, 'RefreshTokenverySecretValue', {
                  expiresIn: '60s'
                });
                res.json({
                  message: 'login Successfully',
                  token: token,
                  refreshToken: refreshToken
                });
              } else {
                var shift = User.shift[0].shift_start;
                shift = shift.split(':');
                var hours = shift[0];
                var minutes = shift[1];
                var TotalSeconds = hours * 3600 + minutes * 60;
                var loginTime = TotalSeconds - 15 * 60;
                var NotLogin = TotalSeconds + 9 * 3600;
                var currentTime = new Date();
                var dateUTC = currentTime.getTime();
                var dateIST = new Date(dateUTC);
                dateIST.setHours(dateIST.getHours() + 5);
                dateIST.setMinutes(dateIST.getMinutes() + 30);
                var TimeA = dateIST.toLocaleTimeString();
                var h = currentTime.getHours();
                var m = currentTime.getMinutes();
                var TS = (h + 5) * 3600 + (m + 30) * 60; //    var getTime=TS/60;
                //    getTime=getTime%60;
                //    console.log('minutes',getTime);
                //   var total=loginTime/60
                //   var min=total%60;
                //   var hor=Math.floor(total/60);
                //   console.log(min,hor)

                console.log('LoginTime', loginTime, ' ,NotLogin:-', NotLogin, ' curent time', TS); // console.log('LoginTime',loginTime,' ,NotLogin:-',NotLogin,' curent time',TS)
                // let token = jwt.sign({email:User.email,username:User.username,role:User.role,id:User._id,rpt_id:User.rpt_id},tokenPrivacy,{expiresIn:'9h'})
                // let refreshToken=jwt.sign({email:User.email},'RefreshTokenverySecretValue',{expiresIn:'60s'})
                // res.json({
                //     message:'login Successfully',
                //     token,
                //     refreshToken
                // })
                //  addLoginStatus(User.rpt_id,User.username,datezone,TimeA,ipAddress);

                if (loginTime < TS && NotLogin > TS) {
                  var getPersonal = function getPersonal(req, res) {
                    var getId = User.rpt_id;
                    console.log(getId);
                    LoginStatus.find({
                      rpt_id: getId
                    }, function (err, docs) {
                      if (!err) {
                        docs.find(function (x) {
                          if (x.date == datezone) {
                            if (x.logout) {
                              console.log('wait for shift');
                            } else {
                              addLoginStatus(User.rpt_id, User.username, datezone, TimeA, ipAddress);

                              var _token = jwt.sign({
                                email: User.email,
                                username: User.username,
                                role: User.role,
                                id: User._id,
                                rpt_id: User.rpt_id
                              }, tokenPrivacy, {
                                expiresIn: '9h'
                              });

                              var _refreshToken = jwt.sign({
                                email: User.email
                              }, 'RefreshTokenverySecretValue', {
                                expiresIn: '60s'
                              });

                              res.json({
                                message: 'login Successfully',
                                token: _token,
                                refreshToken: _refreshToken
                              });
                            }
                          }
                        });
                      } else {
                        res.json(err);
                      }
                    });
                  };

                  return getPersonal();
                } else {
                  res.json({
                    message: 'Shift Over'
                  });
                }
              }
            } else {
              res.json({
                message: 'Password not match'
              });
            }
          });
        } else {
          res.json({
            message: "User Inactive"
          });
        }
      } else {
        res.json({
          message: 'user not found'
        });
      }
    });
  } else {
    res.json({
      message: 'Login With Laptop'
    });
  }
};

var getAllUser = function getAllUser(req, res) {
  user.find(function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
}; // const forget_password = async(req,res)=>{
//     try{
//         // console.log(socket.dnsserver());
//         const email = req.body.email;
// const userData = await user.findOne({email:email});
// if(userData){
//     Email = userData.email;
//         // res.json({Email});
//     const randomString =randomstring.generate();
//   const data =await user.updateOne({email:email},{$set:{token:randomString}});
//   sendResetPasswordMail(Email,randomString);
//   res.status(200).send({success:true,msg:"please check your mail"});
// }else{
//     res.status(200).send({success:true, msg:"This email does not exist"});
// }
//     }
//     catch (error){
//         res.send(400).send({success:false,msg:error.message});
//     }
// }


var deleteUser = function deleteUser(req, res) {
  var deleteid = req.params._id;
  user.findByIdAndDelete(deleteid, function (err, del) {
    if (!err) {
      res.json(del);
    } else {
      res.json(err);
    }
  });
};

var updateUser = function updateUser(req, res) {
  if (!req.body.password) {
    user.findByIdAndUpdate(req.params._id, {
      username: req.body.user_name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      role: req.body.roles,
      status: req.body.status // password:req.body.password,

    }, function (docs, err) {
      if (!err) {
        res.json(docs);
      } else {
        res.json(err);
      }
    });
  } else {
    console.log('Password:' + req.body.password + ' ' + 'username: ' + req.body.user_name);
    bcrypt.hash(req.body.password, 10, function (err, hasspass) {
      if (err) {
        res.json(err);
      }

      user.findByIdAndUpdate(req.params._id, {
        username: req.body.user_name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        role: req.body.roles,
        status: req.body.status,
        password: hasspass
      }, function (docs, err) {
        if (!err) {
          res.json(docs);
        } else {
          res.json(err);
        }
      });
    });
  }
};

module.exports = {
  register: register,
  login: login,
  count: count,
  checkToken: checkToken,
  getAllUser: getAllUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};