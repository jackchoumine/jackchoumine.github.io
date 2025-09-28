## git 技巧

## 根据目录自动切换用户名和邮箱

git 的提交信息是`用户名`+`邮箱`，希望个人项目和公司项目分开，如何配置呢？

git 2.13.0 (2017年发布)以上版本支持根据目录名启用相应的配置。

### 设置 includeIf 步骤

1. 查看版本:

```bash
git --version #  2.13.0 才支持
```

2. 查看全局配置

```bash
git config --show-origin --get --global user.name
file:C:/Users/Administrator/.gitconfig  <your-name> # 前面的路径就是你的 git 全局配置
```

3. 添加 includeIf 配置

使用 vscode 打开`.gitconfig`所在目录，新增 `.gitconfig-jack`，用于存在个人信息的提交信息。

```bash
# .gitconfig-jack
[user]
	name = jackchoumine
	email = jackchoumine@gmail.com
```

把 `.gitconfig-jack` 引入 `.gitconfig`:

```bash
# 个人项目存放位置
[includeIf "gitdir:D:/0test/"]
  path = .gitconfig-jack
```

> 要以`/`结尾。

公司项目也同理。

4. 验证配置是否生效

在`个人项目`中查看用户信息：

```bash
git config --show-origin --get user.name
file:C:/Users/Administrator/.gitconfig-jack     jackchoumine # 输出类似的信息，说明配置成功
git config --show-origin --get user.email
file:C:/Users/Administrator/.gitconfig-jack     jackchoumine@gmail.com
```

## 中文名的文件路径不乱码

Git 对文件路径中非 ASCII 字符的转义编码，这样做可以让 Git 兼容性更好，能够跑在一些编码受限的终端上。

在支持中文的终端上，就会显示乱码，其实不希望 git 这么做。

通过 `core.quotepath` 配置可改变默认行为：

```bash
git config --global core.quotepath false # 全局设置 -- 推荐
git config core.quotepath false # 局部设置
```

## 常用的 git 命令别名

```bash
[core]
	editor = /usr/bin/vim
	quotepath = false
[alias]
	cl = config --list
	cal = config --list | grep alias
	st = status
	au = add -u
	aa = add .
	cm = commit -m
	cam = commit -am
	novcm = commit --no-verify -m # 跳过验证提交
	ch = checkout
	pu = push
  pum = push -u origin master
	pl = pull
	b = branch  # 查看本地分支 新建分支 b new-branch
	ba = branch -a # 查看所有分支
	bv = branch -v # 查看所有分支的最后一次提交
	bd = branch -d # 删除已合并的分支
	bD = branch -D # 强制删除分支
	bm = branch --merged # 查看已合并的分支
	bnm = branch --no-merged # 查看已合并的分支
	mg = merge # 合并分支
	fp = fetch -p # 拉去分支并更新分支映射 fetch --prune
	fa = fetch -a # 拉取所有分支 fetch --all
	fap = fetch -a -p # 拉取所有分支 fetch --all --prune
	lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	plog = log --graph --pretty='format:%C(red)%d%C(reset) %C(yellow)%h%C(reset) %ar %C(green)%aN%C(reset) %s'
	l1 = log --oneline
  rv = remote -v
# [http "https://github.com"]
	# proxy = socks5://127.0.0.1:1086
#[https "https://github.com"]
	# proxy = socks5://127.0.0.1:1086
[http]
	postBuffer = 524288000
[init]
	defaultBranch = master
```
