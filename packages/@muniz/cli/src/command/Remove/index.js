import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import PropTypes from 'prop-types';
import { TextInput, Button, ButtonGroup, Spinner, Select } from '@muniz/ink-ui';
import { lowdbAction } from '../../lib/lowdb.js';
const execa = require('execa');

/**
 * @muniz
 * @type react
 * @description 删除插件
 */
const Remove = (props) => {
  const { input } = props;
  const [pkgList, setPkgList] = useState();
  const [pkgName, setPkgName] = useState([]);
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
    if (data.trim()) {
      setError('');
    } else {
      setError('不能为空');
    }
  }

  function handleOnBlurPkg(data) {
    if (data.trim()) {
      setPkgList(data.trim());
    }
  }

  /**
   * 删除插件方法
   * @param {string} _pkgName 插件名称
   */
  function removePlugin(_pkgName) {
    setStep((state) => {
      return { ...state, spinnerFlag: true };
    });
    execa
      .command(`npm uninstall -g ${_pkgName}`)
      .then(async () => {
        // 向系统配置文件中，删除安装插件记录
        await lowdbAction.removePluginPkg({ pkgName: _pkgName });
        setInstallFlag('删除成功');
        setStep((state) => {
          return { ...state, spinnerFlag: false };
        });

        setTimeout(() => {
          exit();
        }, 200);
      })
      .catch(() => {
        setInstallFlag('删除失败，请执行 muniz list 是否存在该插件！');
        setStep((state) => {
          return { ...state, spinnerFlag: false };
        });
        setTimeout(() => {
          exit();
        }, 200);
      });
  }

  // 开始删除插件
  const handleRemovePkg = async () => {
    setStep((state) => {
      return { ...state, install: true };
    });

    const pkgNameList = await lowdbAction.getPluginPkgName({ shortName: pkgList, isReact: true });

    if (pkgNameList.length === 0) {
      setInstallFlag('删除失败，插件不存在！');
      setStep((state) => {
        return { ...state, install: true, spinnerFlag: false };
      });
      setTimeout(() => {
        exit();
      }, 200);
    } else if (pkgNameList.length === 1) {
      removePlugin(pkgNameList);
    } else {
      setPkgName(pkgNameList);
    }
  };

  return (
    <Box flexDirection="column" marginBottom="1">
      <TextInput
        label="插件名称："
        placeHolder="请输入插件名称（每次只能删除一个插件）"
        onChange={handleOnChnagePkg}
        onBlur={handleOnBlurPkg}
        disabled={step.install}
        value={input.length > 0 ? input[0] : ''}
        error={error}
      />
      {!step.install && (
        <ButtonGroup marginTop="1">
          <Button marginRight="3" disabled={error !== ''} interval="2" onBlur={handleRemovePkg}>
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

      {/* 如果检查到多个同指令插件，需要提示用户进行选择待删除的插件 */}
      {pkgName.length > 0 && (
        <Box marginTop="1" flexDirection="column">
          <Text>存在多个插件，请指定待删除的插件</Text>

          <Box flexDirection="column" marginTop="1">
            {pkgName.map((item, index) => {
              return (
                <Select
                  key={index}
                  onBlur={() => {
                    removePlugin(item.pkgName);
                  }}
                >
                  <Text>{item.pkgName}</Text>
                </Select>
              );
            })}
          </Box>
          <Text color="yellow">操作：按下 tab 键 切换，Enter 键 执行</Text>
        </Box>
      )}

      {/* 安装过渡 交互 */}
      {step.spinnerFlag && (
        <Box marginTop="1">
          <Spinner color="green">
            <Text>正在删除中，等待...</Text>
          </Spinner>
        </Box>
      )}

      {/* 安装结果 提示 */}
      <Box marginTop="1">
        <Text color="green">{installFlag}</Text>
      </Box>
    </Box>
  );
};

Remove.propTypes = {
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

Remove.defaultProps = {
  mode: 'dev',
  isGit: false,
};
export default Remove;
