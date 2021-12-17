import path from 'path';
import fs from 'fs-extra'
import inquirer from 'inquirer'




const GIT_BASE = 'https://github.com/';
const REACT_TPL = 'hzzly/webpack-template';

//处理项目名称
const checkAppName=(appName)=>{
  const file = path.resolve(appName);
  
  if (appName==='.') {
    //在当前目录操作
    checkEmpty(file);
  }else if (checkExist(file)) {
    //目录已经存在
    inquirer.prompt([{
      type: 'confirm',
      message: '创建目录已存在，继续?',
      name: 'input',
    }]).then(answers => {
      console.log('----------------------');
      console.log('🤣--',answers);
      if (answers.ok) {
        rm(appName)
        downloadTemplate(REACT_TPL, file, appName)
      }
    })
  }else{
    //直接下载模板
    downloadTemplate(REACT_TPL, file, appName)
  }

}
//检查当前目录是否为空
const checkEmpty = (file)=>{
  const dirFiles = fs.readdirSync(file);
  console.log('----------------------');
  console.log('🤣--',dirFiles);
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
          downloadTemplate(REACT_TPL,file,appName)
        }else if (answers.input==='在当前目录中直接构建项目') {
          downloadTemplate(REACT_TPL,file,appName)
        }
    })
  }else{
    downloadTemplate(REACT_TPL,file,appName)
  }
}
//检查目录是否存在
const checkExist=(file)=>{
  return fs.pathExistsSync(file);
}

//下载模板
const downloadTemplate =(template, tmp)=>{

}

const Util = {
  checkAppName,
}

export default Util