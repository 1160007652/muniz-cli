import React, { useState } from 'react';
import { Box, Text, useApp, useFocusManager } from 'ink';
import PropTypes from 'prop-types';
import { TextInput, Button, ButtonGroup, Spinner } from '@muniz/ink-ui';
import { lowdbAction } from '../../lib/lowdb.js';
const execa = require('execa');

/**
 * @muniz
 * @type react
 * @description 添加插件
 */
const Add = (props) => {
  const { input } = props;
  const [pkgList, setPkgList] = useState();
  const [error, setError] = useState('不能为空');
  const [installFlag, setInstallFlag] = useState('');
  const { exit } = useApp();
  // 执行步骤
  const [step, setStep] = useState({
    install: false,
    help: false,
    spinnerFlag: false,
  });

  function handleOnChnagePkg(data) {
    if (String(data).trim()) {
      let shortName = String(data.trim()).match(/.*?muniz-plugin-(.*?)$/);
      shortName = shortName?.length > 1 ? shortName[1] : '';
      if (!shortName) {
        setError(`${data.trim()} : 不是「 Muniz 」 脚手架插件`);
      } else {
        setError('');
        setPkgList({ shortName, pkgName: data.trim() });
      }
    } else {
      setError('不能为空');
    }
  }

  // 开始安装 插件
  const handleInstallPkg = async () => {
    setStep((state) => {
      return { ...state, install: true, spinnerFlag: true };
    });

    // 调用安装命令
    execa
      .command(`npm install -g ${pkgList.pkgName}`)
      .then(() => {
        // 向系统配置文件中，保存安装插件记录
        lowdbAction.addPluginPkg(pkgList);
        setInstallFlag('安装成功');
        setStep((state) => {
          return { ...state, help: true, spinnerFlag: false };
        });
        const pluginModule = require(pkgList.pkgName).default();

        if (pluginModule.isStart) {
          //生成自启动脚本
          const osascriptContent = `
            tell application "Terminal"
              activate
              do script "muniz ${pkgList.shortName}"
            end tell
          `;
          execa.commandSync(`osascript -e '${osascriptContent}'`, {
            shell: true,
          });
        }
        setTimeout(() => {
          exit();
        }, 200);
      })
      .catch(() => {
        setInstallFlag('安装失败，请检查 npm 镜像，是否存在本次安装的插件包！');
        setStep((state) => {
          return { ...state, spinnerFlag: false };
        });
        setTimeout(() => {
          exit();
        }, 200);
      });
  };

  return (
    <Box flexDirection="column">
      <Box marginBottom="1">
        <Text>名称格式：</Text>
        <Text dimColor>[ @muniz/muniz-plugin-xxx ] - [ xxx/muniz-plugin-xxx ] - [ muniz-plugin-xxx ]</Text>
      </Box>
      <TextInput
        label="插件名称："
        placeHolder="请输入插件名称（每次只能安装一个插件）"
        onChange={handleOnChnagePkg}
        value={input.length > 0 ? input[0] : ''}
        error={error}
      />
      {!step.install && (
        <ButtonGroup marginTop="1">
          <Button marginRight="3" disabled={error !== ''} interval="2" onBlur={handleInstallPkg}>
            确认
          </Button>
          <Button
            interval={2}
            marginRight="3"
            onBlur={() => {
              exit();
            }}
          >
            取消
          </Button>
        </ButtonGroup>
      )}

      {/* 安装过渡 交互 */}
      {step.spinnerFlag && (
        <Box marginTop="1">
          <Spinner color="green">
            <Text>正在安装中，等待...</Text>
          </Spinner>
        </Box>
      )}

      {/* 安装结果 提示 */}
      <Box marginTop="1">
        <Text color="green">{installFlag}</Text>
      </Box>

      {/* 安装成功的 提示 */}
      {step.help && (
        <Box marginTop="1">
          <Text>使用命令:</Text>
          <Text color="blue"> $ muniz create</Text>
        </Box>
      )}
    </Box>
  );
};

Add.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  mode: PropTypes.string,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Add.defaultProps = {
  mode: 'dev',
  isGit: false,
};
export default Add;
