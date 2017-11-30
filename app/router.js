'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/uptoken', controller.upload.getUpToken);
  router.post('/upload', controller.upload.upload);
};
