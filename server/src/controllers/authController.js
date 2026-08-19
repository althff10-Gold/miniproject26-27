const authService = require('../services/authService');
const ResponseFormatter = require('../utils/responseFormatter');

class AuthController {
  async register(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await authService.register(req.body, ipAddress);

      const message = result.requiresGuardianConsent
        ? 'Registration initiated! A parental consent confirmation link has been generated.'
        : 'Registration successful! Welcome to TeenPreneur Hub.';

      return ResponseFormatter.created(res, result, message);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await authService.login(email, password, ipAddress);

      return ResponseFormatter.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);

      return ResponseFormatter.success(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return ResponseFormatter.success(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await authService.getCurrentUser(req.user.id);
      return ResponseFormatter.success(res, user, 'User profile retrieved');
    } catch (error) {
      next(error);
    }
  }

  async guardianApproval(req, res, next) {
    try {
      const { token, decision } = req.body;
      const result = await authService.processGuardianApproval(token, decision);
      return ResponseFormatter.success(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
