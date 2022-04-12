const authService = require("../services/Auth_Service");
const authController = {
  login: async (req, res) => {
    const response = await authService.login(req.body, res);
    res.status(response.status).json(response.data);
  },
  register: async (req, res) => {
    const response = await authService.register(req.body);
    res.status(response.status).json(response.data);
  },
  refreshToken: async (req, res) => {
    const response = await authService.refreshToken(req.cookies);
    res.status(response.status).json(response.data);
  },
  logout: (req, res) => {
    req.logOut();
    res.clearCookie("refreshToken");
    res.status(200).json("Log out successful");
  },
  oauthSuccess: async (req, res) => {
    const response = await authService.oauthSuccess(req.user, res);
    res.status(response.status).json(response.data);
  },
  getAuthenticatedEmailCode: async (req, res) => {
    const response = await authService.getAuthenticatedEmailCode(req.body);
    res.status(response.status).json(response.data);
  },
  verifyEmail: (req, res) => {},
};
module.exports = authController;
