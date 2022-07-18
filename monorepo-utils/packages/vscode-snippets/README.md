# `vscode-snippets`

## 描述
通过命令行生成vscode的snippets

## 使用

```
npm i -g @exile_song/vscode-snippets 
vssp create ne1dcw --prefix=v11ue --scope=vue --file=../base/index.js --description='西出阳关无 故人'

// TODO: DEMONSTRATE API
```
|  参数   | 描述  | 默认值 | 是否必填|
|  ----  | ----  | ---- | ---- | 
| prefix  | 触发词 | log  | 否   
| socpe  | 限制文件格式 | javascript, typescript | 否 
| file  | 模板地址 | -- | 是 
| description| 描述 | this is a description | 否
