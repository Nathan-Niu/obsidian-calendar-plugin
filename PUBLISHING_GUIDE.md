# 发布到 Obsidian 官方插件库指南

## 📋 前置条件

在提交到官方插件库之前，请确保：

1. ✅ 插件功能完整且稳定
2. ✅ 已正确设置归属声明（LICENSE 和 README）
3. ✅ 插件 ID 唯一（`calendar-chinese`）
4. ✅ 有清晰的安装和使用说明

## 🔧 当前配置状态

### ✅ 已完成

- [x] LICENSE 中添加了双重版权声明
- [x] README 开头添加了清晰的 fork 声明
- [x] README 中包含了归属声明部分
- [x] manifest.json 更新了插件名称和描述
- [x] 插件 ID 改为 `calendar-chinese`（避免与原版冲突）

### 📝 manifest.json 关键信息

```json
{
  "id": "calendar-chinese",
  "name": "Calendar Chinese",
  "description": "Calendar view with enhanced Chinese character counting and multilingual support",
  "author": "Liam Cain & Nathan Niu",
  "authorUrl": "https://github.com/liamcain, https://github.com/Nathan-Niu"
}
```

## 🚀 发布流程

### 步骤 1：准备 GitHub 仓库

1. 确保仓库是公开的
2. 创建一个新的 Release（或使用现有的 v1.5.11）
3. 确保 Release 包含：
   - `main.js`
   - `manifest.json`
   - `styles.css`
   - `calendar-offline-release.zip`（可选）

### 步骤 2：提交到 obsidianmd/obsidian-releases

1. Fork [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
2. 编辑 `community-plugins.json` 文件，添加你的插件信息：

```json
{
  "id": "calendar-chinese",
  "name": "Calendar Chinese",
  "author": "Nathan Niu",
  "description": "Calendar view with enhanced Chinese character counting and multilingual support",
  "repo": "Nathan-Niu/obsidian-calendar-plugin"
}
```

3. 创建 Pull Request

### 步骤 3：等待审核

- Obsidian 团队会审核你的插件
- 确保遵循他们的[插件提交指南](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)
- 可能需要根据反馈进行修改

## ⚠️ 注意事项

### MIT 许可证合规

✅ **我们已做到：**
- 保留了原始版权声明（Liam Cain）
- 添加了自己的版权声明（Nathan Niu）
- 在 README 中明确说明这是 fork 版本
- 感谢原作者的工作

### 与原版插件的区别

在提交时，需要清楚说明你的插件与原版的区别：

**新增功能：**
1. 中文字数统计（支持 CJK 字符）
2. 中英文使用不同的系数（可自定义）
3. 设置界面多语言支持（英语/中文）
4. 改进的 "Override locale" 描述
5. 自动化的 GitHub Actions 发布流程

**兼容性：**
- 最低 Obsidian 版本：1.0.0
- 完全兼容原版的 daily notes 和 weekly notes

### 插件 ID 的重要性

- 使用 `calendar-chinese` 而不是 `calendar`
- 这样可以与原版插件共存
- 用户可以选择安装其中一个或两个都安装

## 📞 联系方式

如果在发布过程中遇到问题：

1. 查看 [Obsidian 插件开发文档](https://docs.obsidian.md/Plugins/)
2. 在 [Obsidian Forum](https://forum.obsidian.md/) 寻求帮助
3. 在 GitHub Issue 中提问

## 🎯 下一步

1. 删除旧的标签并重新创建（因为修改了 manifest.json）
2. 推送新的 Release
3. 提交到 obsidian-releases

```bash
# 删除旧标签
git tag -d v1.5.11
git push origin --delete v1.5.11

# 创建新标签
git tag v1.5.11
git push origin v1.5.11
```

祝你好运！🎉
