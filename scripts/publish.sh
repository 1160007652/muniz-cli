# 生产环境脚本 - 发布到 npm、git 仓库

# 首次启动时删除之前构建出的“dist”文件夹
rm -rf ./packages/@muniz/*/dist

# 进行文件打包
lerna run build

# 修改 命令行执行权限，【由于 Babel 编译出的文件权限不够】
chmod +x ./packages/@muniz/cli/dist/bin/cli.js

# 拷贝文件
cp -f ./scripts/initData/system.json ./packages/@muniz/cli/dist/configs/system.json

# 生成命令
lerna run generateCommandDesc

# 提示打包成功
echo 'Muniz 脚手架 项目打包成功'

# 发布脚手架
lerna publish

