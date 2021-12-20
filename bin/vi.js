#! /usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import Util from '../lib/util.js';
import inquirer from 'inquirer'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();


//设置工具版本
program
  .version(pkg.version,'-v, -V, --version','输出当前版本')
  .usage('<command> [options] <appName>')
  .option("-c, --clone", "使用 git clone")
  .on("--help", () => {
    console.log();
    console.log("Examples:");
    console.log();
    console.log(
      chalk.gray("  # create a new react project")
    );
    console.log("  $ vi-cli create demo");
    console.log();
  });

//配置create命令
program
  .command('create')
  .argument('[appName]')
  .description('根据模板构建项目')
  .action((appName, option) => {
    //初始化
    Util.initializing(pkg);

    //判断是否传入appName
    if (typeof appName === 'string') {
      //处理项目名称
      Util.checkAppName(appName,program)
    }else{
      inquirer.prompt([{
        type: 'input',
        name: 'appName',
        message: '请输入项目名称：',
        validate: appName => {
          if (!appName) {
            return '⚠️  项目名称不能为空！（输入.在当前所在目录创建项目）';
          }
          return true;
        }
      }]).then(({appName})=>{
        if (appName) {
          //处理项目名称
          Util.checkAppName(appName,program)
        }
      })
    }
});



 program.on('command:*', function () {
  console.error('Invalid command: %s\n', program.args.join(' '));
  program.help();
  process.exit(1);
});

function help() {
  program.parse(process.argv);  // 解析
  if (program.args.length < 1) return program.help();
}
help();
