const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const db = require('./../db')
const con = db.dbConnection

const jwtSERCRET = "azefezfezfzfa23432532523ezfezfezf45Gf"

const sendJWT = function(id) {
    return jwt.sign({ id }, jwtSERCRET, {
        expiresIn: '90d'
      });
}

const sendCookieJWT = (res, statusCode, user) => {
    const token = sendJWT(user.ID_utilisateur);
  
    const cookieOption = {
      expires: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_EN === 'production') cookieOption.secure = true; //wock only with HTTPS
    res.cookie('jwt', token, cookieOption);
  
    res.status(statusCode).json({
      status: 'success',
      token,
      date: {
        user
      }
    });
  };


exports.logIn = async (req, res) => {
    //get the info from the user
    const { nomUser, MDP } = req.body
    //serche the user info from the DB
    const query  = `SELECT * FROM Utilisateurs WHERE nomUser = ? AND MDP = ?`

    //execute the query
    con.all(query , [nomUser, MDP], (err, rows) => {
		if (err) {
      console.log('err', err)
			return res.status(400).json({
				status: "fail",
				message: err.message,
				error: err,
			});
		}

    if (!rows || rows.length === 0) {
      console.log("No rows returned from the query.");
      return res.status(404).json({
          status: "fail",
          message: "No rows found matching the criteria.",
      });
    }

    sendCookieJWT(res, 200, rows[0])
	})
}


exports.protect = (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  const pylode = jwt.verify(token, jwtSERCRET)

  const query = `SELECT * FROM Utilisateurs WHERE ID_utilisateur = ?`

  con.all(query, [pylode.id], (err, rows) => {
    if (err) {
      console.log('err', err)
			return res.status(400).json({
				status: "fail",
				message: err.message,
				error: err,
			});
		}

    if (!rows || rows.length === 0) {
      console.log("No rows returned from the query.");
      return res.status(404).json({
          status: "fail",
          message: "No rows found matching the criteria.",
      });
    }

    if(rows[0].Role === 'admin') {
      req.user = rows[0]
      return next()
    }
  })
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // check fi the user role is in the roles array
    if (!roles.includes(req.user.role))
      return res.status(402).json({
            status: 'fail',
            message: 'vous n avez pas le droit d acceder a ce ganre de data'
      })
      
    next();
  };
};