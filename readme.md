多环境提测方案
结合 git lab ci 实现多容器差异化部署，方便开发测试

### work flow
![](https://raw.githubusercontent.com/aJean/daily-activities/master/imgs/%E5%AE%B9%E5%99%A8/schedulejs-flow.png)

### roadmap
主要分为四块内容

#### env tools -- 50%
- docker、docker-compose
- bootstrap
- runtime
- constrol shells

#### dev tools -- 30%
两个方案：基于 ci/cd 自动化构建，通过 cli cmd 自主上传
- 自动化，git hooks、git lab ci、git runner（需要申请资源）
- cmd 文件远程上传，scp （简单）、http push （node 封装）
- umi plugins

#### server -- 20%
- nginx proxy
- file server，接收项目文件
- log server，日志采集

#### ui -- 20%
- console panel，用于测试端环境选择
- docker monitor，容器管理
- log visualization，日志可视化