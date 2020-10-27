# 开发启动脚本

# 首次启动时删除之前构建出的“dist”文件夹
rm -rf ./packages/@muniz/*/dist

# 进行文件打包
lerna run dev --parallel

# 修改 命令行执行权限，【由于 Babel 编译出的文件权限不够】
chmod +x ./packages/@muniz/cli/dist/bin/cli.js

# 拷贝文件
cp -f ./packages/@muniz/cli/src/configs/system.json ./packages/@muniz/cli/dist/configs/system.json
