import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import boxen from 'boxen';

const BOXEN_OPTS = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: '#fae191',
  borderStyle: 'round'
};

const checkVersion=(pkg)=>{
  console.log();
  console.log('🛠️  Checking your vi-cli version...');

  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 0
  });
 
  const update = notifier.update;
  if (update) {
    const messages = [];
    messages.push(`Update available ${chalk.grey(update.current)} → ${chalk.green(update.latest)}`)
    messages.push(`Run ${chalk.cyan(`npm i -g ${pkg.name}`)} to update`)
    console.log(boxen(messages.join('\n'), BOXEN_OPTS));
    console.log('🛠️  Finish checking your vi-cli. CAUTION ↑↑', '⚠️');
  }
  else {
    console.log('🛠️  Finish checking your vi-cli. OK', chalk.green('✔'));
  }

}
export default checkVersion;