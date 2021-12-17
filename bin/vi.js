#! /usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import Util from '../lib/util.js';
import inquirer from 'inquirer'
import figlet from 'figlet'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();

//展示1
console.log(
  chalk.green(
    figlet.textSync("VI CLI")
));

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
    console.log("  $ hzzly create demo");
    console.log();
  });

//配置create命令
program
  .command('create')
  .argument('[appName]')
  .description('根据模板构建项目')
  .action((appName, option) => {
    //获得了参数，可以在这里做响应的业务处理
    console.log(`指令 create 后面跟的参数值: ${appName}`);
    console.log(option);
    //判断是否传入appName
    if (typeof appName === 'string') {
      //处理项目名称
      Util.checkAppName(appName)
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
          Util.checkAppName(appName)
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
