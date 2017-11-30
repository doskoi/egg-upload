'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.title) + path.extname(stream.filename).toLowerCase();

    console.log('GOT ' + filename);
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    console.log('Save to ', writeStream);

    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    this.ctx.redirect('/public/' + filename);
  }

  async getUpToken() {
    const { ctx } = this;
    const token = await ctx.service.qiniu.getUpToken();
    ctx.body = token;
  }
}

module.exports = UploadController;
