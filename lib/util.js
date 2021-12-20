import path from 'path';
import fs from 'fs-extra'
import inquirer from 'inquirer'
import boxen from 'boxen';
import chalk from 'chalk';
import figlet from 'figlet'
import checkVersion from './checkVersion.js'
import downloadTemplate from './downloadTemplate.js';


const REACT_TPL = '';

const BOXEN_OPTS = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: '#678491',
  borderStyle: 'round'
};
//初始化log
const initializing=(pkg)=>{
  const messages = [];
  messages.push(
    `🔥  Welcome to use vi-cli ${chalk.grey(`v${pkg.version}`)}`
  );
  messages.push(
    chalk.grey('https://github.com/vivizong/vi-cli')
  );
  // messages.push(
  //   chalk.green(
  //     figlet.textSync("VI CLI"))
  // );
  console.log(boxen(messages.join('\n'), BOXEN_OPTS));
  checkVersion(pkg);
}


//处理项目名称
const checkAppName=(appName,program)=>{
  const file = path.resolve(appName);
  
  if (appName==='.') {
    //在当前目录操作
    checkEmpty(file,program);
  }else if (checkExist(file)) {
    //目录已经存在
    inquirer.prompt([{
      type: 'confirm',
      message: '创建项目名称的目录已存在，是否删除该目录进行构建，继续?',
      name: 'input',
    }]).then(answers => {
      if (answers.input) {
        fs.emptyDirSync(file)
        downloadTemplate(program,REACT_TPL, file, appName)
      }
    })
  }else{
    console.log(chalk.blue(`将在路径${file}/下构建项目`))
    //直接下载模板
    downloadTemplate(program,REACT_TPL, file, appName)
  }
}
//检查当前目录是否为空
const checkEmpty = (file,program)=>{
  const dirFiles = fs.readdirSync(file);

  if (dirFiles.length>0) {
    inquirer.prompt([{
      type:'list',
      name:'input',
      message:'🤣--当前目录不为空,请选择构建方式',
      choices:['在当前目录中直接构建项目',
               '清空当前目录后构建项目']
    }]).then(answers=>{
        if (answers.input==='清空当前目录后构建项目') {
          fs.emptyDirSync(file)
          downloadTemplate(program,REACT_TPL,file)
        }else if (answers.input==='在当前目录中直接构建项目') {
          downloadTemplate(program,REACT_TPL,file)
        }
    })
  }else{
    downloadTemplate(program,REACT_TPL,file)
  }
}
//检查目录是否存在
const checkExist=(file)=>{
  return fs.pathExistsSync(file);
}


const Util = {
  checkAppName,
  initializing
}

export default Util