/*
 * @Author: wujingfei
 * @Date: 2020-06-15 14:06:37
 * @Description: WebpackSymlinkPlugin test
 */
const path = require("path");
const WebpackSymlinkPlugin = require("../index.js");
const webpack = require("webpack");
const { describe } = require("mocha");
const fs = require("fs");

const src = path.resolve(__dirname, "./webpack-test");
const dest = path.resolve(__dirname, "./symlink");

let success = false;

const config = {
  entry: path.resolve(__dirname, "./webpack-test/index.js"),
  plugins: [
    new WebpackSymlinkPlugin({
      symlinkList: [
        {
          src,
          dest,
        },
      ],
      onSuccess: function () {
        success = true;
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
  },
};

describe("WebpackSymlinkPlugin test", function (done) {
  it("create symlink testCase", function (done) {
    webpack(config, (err) => {
      if (err) {
        throw new Error(err);
      }

      if (!success) {
        throw new Error("onSuccess 未执行");
      }

      if (!fs.existsSync(path.resolve(dest, "./index.js"))) {
        throw new Error("软连接执行失败");
      }

      done();
    });
  });
});
