import { default as config } from './configs';
import { default as create } from './command/Create';
import { default as update } from './command/Update';

export default {
  config,
  command: {
    update,
    default: create, // 默认执行的命令
  },
};
