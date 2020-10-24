const { promisify } = require('util');
const { join, relative, extname, parse } = require('path');
const fs = require('fs');
import { parseCommand } from './parseCommand';

const stat = promisify(fs.stat);

const generateCommand = async (commandsPath, dirPath) => {
  const paths = fs.readdirSync(dirPath);
  const commands = [];

  const promises = paths.map(async (path) => {
    // Since `readdir` returns relative paths, we need to transform them to absolute paths
    const fullPath = join(dirPath, path);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      const subCommands = await generateCommand(commandsPath, fullPath);
      const indexCommand = subCommands.find((command) => command.isIndex) || {
        isDefaultIndex: true,
      };

      commands.push({
        ...indexCommand,
        isIndex: false,
        name: path,
        // subCommands: subCommands.filter((command) => !command.isIndex),
      });
    }

    if (stats.isFile() && ['.js', '.tsx'].includes(extname(fullPath))) {
      const command = await parseCommand(fullPath);
      const { name } = parse(fullPath);
      const isIndex = name === 'index';

      commands.push({
        ...command,
        isIndex,
        name: isIndex ? '*' : name,
        path: relative(commandsPath, fullPath),
        // subCommands: [],
      });
    }
  });

  await Promise.all(promises);

  return commands;
};

export default generateCommand;
