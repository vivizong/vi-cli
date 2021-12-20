import ora from 'ora';
import download from 'download-git-repo';
import chalk from 'chalk';

const GIT_BASE = 'https://github.com/';

const downloadTemplate = (program,template,path,appName)=>{
  const spinner = ora(`Download the template from ${GIT_BASE}${template}`);
  spinner.start();
  const clone = program.clone || false;
  download(template,path,{clone},err=>{
    spinner.stop();
    if (err) {
      console.error(
        chalk.red(
        "Failed to download repo " + template + ": " + err.message.trim()
        )
      );
      process.exit(1)
    }
    console.log('🌟  Finish create a new project. OK', chalk.green('✔'));
    console.log();
    console.log(`To get started:\n\n  ${appName ? `cd ${appName}\n  ` : ''}yarn\n  yarn run start\n\nDocumentation can be found at ${GIT_BASE}${template}`);
    console.log();
  })
}

export default downloadTemplate;