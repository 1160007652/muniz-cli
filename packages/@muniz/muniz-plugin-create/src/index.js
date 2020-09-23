import { default as config } from './configs';
import { default as create } from './ui/Create';
import { default as update } from './ui/Update';

export default {
  config,
  update,
  default: create, // 默认执行的命令
};
