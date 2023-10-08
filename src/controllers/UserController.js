const JwtService = require('../services/JwtService');
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  try {
    const {  email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if ( !email || !password || !confirmPassword ) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Invalid Email Address',
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Incorrect password',
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if ( !email || !password ) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Invalid Email Address',
      });
    }
    const response = await UserService.loginUSer(req.body);
    const {refresh_token, ...newResponse} = response
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: 'strict'
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const data = req.body
    if(!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    if(!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.deleteUser(userId)
    return res.status(200).json(response)
  }catch(e){
    return res.status(404).json({
      message: e
    })
  }
}

const getAllUser = async (req, res) => {
try {
  const response = await UserService.getAllUser()
  return res.status(200).json(response)
} catch (e) {
  return res.status(404).json({
    message: e
  })
}
}

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id
    if(!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.getDetailsUser(userId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token
    if(!token) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The token is required'
      })
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(200).json({
      status: 'OK',
      message: 'Logout success'
    })
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}
 
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
};
