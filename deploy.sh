# 项目目录
filename="insurance-claim-admin"
# 打包命令
buildCmd="yarn build:stage"
# 部署人
user="xxx"
# 发布命令
deployCmd="scp -P 62223 -r dist/*  $user@dev.njzhyl.cn:/data/nginx/html/$filename/;"

function getVar() {
  case $1 in
    'prod')
        buildCmd="yarn build:prod"
        deployCmd="scp -P 62226 -r dist/*  $user@dev.njzhyl.cn:/data/nginx/html/console/$filename/"
        ;;
    *)
        buildCmd="yarn build:stage"
  esac
}

getVar $1

yarn
if [ $filename ] && $buildCmd; then
  echo $deployCmd;
  $deployCmd;
else
  echo '文件名不存在 或 执行命令不正确';
fi
