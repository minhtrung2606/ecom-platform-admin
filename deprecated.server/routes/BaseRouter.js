import express, { Router } from 'express';

class BaseRouter {
  constructor(rootUrl = '') {
    this.router = express.Router();
    this.rootUrl = rootUrl;
  }

  _addRequest(method = 'get', url = '/') {
    return (handler) => {
      this.router[method](url, handler);
    };
  }

  addGetRequest(url) {
    return this._addRequest('get', url);
  }

  addPostRequest(url) {
    return this._addRequest('post', url);
  }

  addPatchRequest(url) {
    return this._addRequest('patch', url);
  }

  /**
   * Register to an Express router via Express router `use` API
   * @param {Router} router
   */
  registerTo(router) {
    if (this.rootUrl) {
      router.use(this.rootUrl, this.router);
      return;
    }
    else router.use(this.router);
  }
}

export default BaseRouter;
