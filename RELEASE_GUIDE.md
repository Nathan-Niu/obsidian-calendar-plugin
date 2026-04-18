# GitHub Actions 自动发布指南

## 📦 自动化发布流程

本项目已配置 GitHub Actions 自动发布功能。当你推送一个新的 Git 标签时，会自动：
1. 安装依赖
2. 构建插件（`npm run build`）
3. 创建 GitHub Release（草稿状态）
4. 上传 `main.js`、`manifest.json` 和 `styles.css`

## 🚀 如何使用

### 步骤 1：更新版本号

在创建 Release 之前，记得更新版本号：

1. 编辑 `manifest.json`，修改 `version` 字段
2. 编辑 `versions.json`，添加新版本记录

例如：
```json
// manifest.json
{
  "version": "1.5.11"
}
```

```json
// versions.json
{
  "1.5.11": "0.15.0"
}
```

### 步骤 2：提交更改

```bash
git add manifest.json versions.json
git commit -m "Bump version to 1.5.11"
```

### 步骤 3：创建并推送标签

```bash
# 创建标签
git tag v1.5.11

# 推送标签到 GitHub
git push origin v1.5.11
```

### 步骤 4：等待自动构建

推送标签后，GitHub Actions 会自动开始构建：
1. 访问仓库的 **Actions** 标签页查看构建进度
2. 构建完成后，会在 **Releases** 页面创建一个草稿 Release

### 步骤 5：发布 Release

1. 访问仓库的 **Releases** 页面
2. 找到刚创建的草稿 Release
3. 点击 **Edit** 编辑发布信息
4. 添加发布说明（可选）
5. 点击 **Publish release** 正式发布

## 📥 安装插件

### 方法 1：下载 Release 文件（推荐）

1. 从 Releases 页面下载最新版本的 `.zip` 文件（如果有）或直接下载三个文件
2. 在 Obsidian Vault 中创建目录：`.obsidian/plugins/calendar/`
3. 将以下三个文件放入该目录：
   - `main.js`
   - `manifest.json`
   - `styles.css`
4. 在 Obsidian 中重新加载插件或重启 Obsidian
5. 在社区插件中启用 Calendar 插件

### 方法 2：Git Clone

```bash
cd /path/to/your/vault/.obsidian/plugins/
git clone <your-repo-url> calendar
cd calendar
npm install
npm run build
```

然后在 Obsidian 中启用插件。

## 🔧 自定义配置

如果需要修改发布流程，可以编辑 `.github/workflows/release.yml` 文件。

常见修改：
- 更改 Node.js 版本
- 添加额外的构建步骤
- 自动发布（移除 `--draft` 标志）

## 💡 提示

- **Draft Release**：当前配置创建的是草稿 Release，需要你手动确认发布，这样可以检查构建结果
- **自动发布**：如果想完全自动化，可以将 `--draft` 改为 `--latest`
- **版本管理**：建议使用语义化版本号（如 v1.5.11）

## ❓ 常见问题

**Q: 构建失败了怎么办？**
A: 检查 Actions 标签页中的日志，修复错误后删除失败的 Release，重新推送标签

**Q: 如何重新触发构建？**
A: 删除标签后重新创建并推送，或者在 Actions 页面手动重新运行

**Q: 可以不创建 Release 吗？**
A: 可以，直接使用 git clone + npm run build 的方式即可
