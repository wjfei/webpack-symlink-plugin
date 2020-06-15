/*
 * @Author: wujingfei 00718
 * @Date: 2020-06-15 10:49:40
 * @Description: Description
 */
const fs = require("fs");
const cmd = require("node-cmd");

const { log } = console;

/**
 * windows系统创建软连接
 */
function createWinSymlink(src, dest) {
    const command = `mklink /J ${dest.replace(/\\/g, "\\")} ${src.replace(
        /\\/g,
        "\\"
    )}`;
    cmd.run(command).on("error", e => {
        throw new Error(e);
    });
}

module.exports = class WebpackSymlinkPlugin {
    constructor(props = {}) {
        const { symlinkList, onSuccess } = props;
        this.symlinkList = symlinkList;

        this.onSuccess = onSuccess;
    }

    apply(compiler) {
        compiler.hooks.entryOption.tap("entryOption", () => {
            if (this.symlinkList) {
                this.symlinkList.forEach(symlinkMap => {
                    const { src, dest } = symlinkMap;
                    this.createLink(src, dest);
                });
            }
        });
    }

    createLink(src, dest) {
        if (fs.existsSync(dest)) {
            fs.unlinkSync(dest);
        }

        // windows系统创建软连接(windows没管理员权限需要特殊处理)
        if (process.platform === "win32") {
            createWinSymlink(src, dest);
            this.success();
        } else {
            fs.symlink(src, dest, e => {
                if (e) {
                    throw new Error(e);
                } else {
                    this.success();
                }
            });
        }
    }

    success() {
        if (this.onSuccess) {
            this.onSuccess();
        } else {
            log("创建软连接成功");
        }
    }
};
