import User from '../models/userModel.js';

export default class UserController {
  // ROUTE HANDLERS
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };
  getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined.',
    });
  };
  createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined.',
    });
  };
  updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined.',
    });
  };
  deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined.',
    });
  };
}
