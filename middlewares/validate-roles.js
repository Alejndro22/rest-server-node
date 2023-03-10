import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You attempted to verify role without validating jwt succesfully',
    });
  }

  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not admin - cannot perform this action`,
    });
  }
  next();
};

const hasExpectedRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'You attempted to verify role without validating jwt succesfully',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `You must have one of this roles [ ${roles} ]`,
      });
    }
    next();
  };
};

export { isAdminRole, hasExpectedRole };
