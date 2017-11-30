'use strict';

const Service = require('egg').Service;

class QiniuService extends Service {
  async getUpToken() {
    const result = await this.ctx.curl(this.config.qiniu.endpoint, { dataType: 'json' });
    return result.data.uptoken;
  }
}

module.exports = QiniuService;
