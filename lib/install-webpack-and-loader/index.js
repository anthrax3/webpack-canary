import childProcess from 'child_process';

export default function(webpackSetup, loaderSetup, callback) {
  const installCommand = `npm install ${webpackSetup} ${loaderSetup}`;

  childProcess.exec(installCommand, function(err, stdout, stderr) {
    if (err) {
      callback(['Error calling install command', err]);
      return;
    }

    if (stderr) {
      callback(['Error output when installing', stderr]);
      return;
    }

    if (stdout.indexOf(webpackSetup.toLocalName()) === -1 ||
        stdout.indexOf(loaderSetup.toLocalName()) === -1) {
      callback(['Expected versions not in dependency tree', stdout]);
      return;
    }

    callback();
  });
};