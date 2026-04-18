// 多语言配置文件
export type Language = 'en' | 'zh';

export interface ITranslations {
  // 设置分组标题
  generalSettings: string;
  weeklyNoteSettings: string;
  advancedSettings: string;
  
  // 警告信息
  dailyNotesNotEnabled: string;
  dailyNotesDescription: string;
  weeklyNoteMigrationNote: string;
  
  // Words per dot 设置
  wordsPerDot: string;
  wordsPerDotDesc: string;
  
  // Chinese chars per dot 设置
  chineseCharsPerDot: string;
  chineseCharsPerDotDesc: string;
  
  // Week start 设置
  weekStart: string;
  weekStartDesc: string;
  localeDefault: string;
  
  // Confirm create 设置
  confirmCreate: string;
  confirmCreateDesc: string;
  
  // Show week number 设置
  showWeekNumber: string;
  showWeekNumberDesc: string;
  
  // Weekly note 设置
  weeklyNoteFormat: string;
  weeklyNoteFormatDesc: string;
  weeklyNoteTemplate: string;
  weeklyNoteTemplateDesc: string;
  weeklyNoteFolder: string;
  weeklyNoteFolderDesc: string;
  
  // Locale override 设置
  localeOverride: string;
  localeOverrideDesc: string;
  systemDefault: string;
  
  // Language 设置
  language: string;
  languageDesc: string;
}

export const translations: Record<Language, ITranslations> = {
  en: {
    generalSettings: "General Settings",
    weeklyNoteSettings: "Weekly Note Settings",
    advancedSettings: "Advanced Settings",
    
    dailyNotesNotEnabled: "⚠️ Daily Notes plugin not enabled",
    dailyNotesDescription: "The calendar is best used in conjunction with either the Daily Notes plugin or the Periodic Notes plugin (available in the Community Plugins catalog).",
    weeklyNoteMigrationNote: "Note: Weekly Note settings are moving. You are encouraged to install the 'Periodic Notes' plugin to keep the functionality in the future.",
    
    wordsPerDot: "Words per dot",
    wordsPerDotDesc: "How many words should be represented by a single dot?",
    
    chineseCharsPerDot: "Chinese chars per dot",
    chineseCharsPerDotDesc: "Chinese information entropy is about 2.1 times that of English, but you can customize the value as you wish",
    
    weekStart: "Start week on:",
    weekStartDesc: "Choose what day of the week to start. Select 'Locale default' to use the default specified by moment.js",
    localeDefault: "Locale default",
    
    confirmCreate: "Confirm before creating new note",
    confirmCreateDesc: "Show a confirmation modal before creating a new note",
    
    showWeekNumber: "Show week number",
    showWeekNumberDesc: "Enable this to add a column with the week number",
    
    weeklyNoteFormat: "Weekly note format",
    weeklyNoteFormatDesc: "For more syntax help, refer to format reference",
    weeklyNoteTemplate: "Weekly note template",
    weeklyNoteTemplateDesc: "Choose the file you want to use as the template for your weekly notes",
    weeklyNoteFolder: "Weekly note folder",
    weeklyNoteFolderDesc: "New weekly notes will be placed here",
    
    localeOverride: "Date display locale:",
    localeOverrideDesc: "Set the language and format for date display in the calendar",
    systemDefault: "Same as system",
    
    language: "Language / 语言",
    languageDesc: "Choose the language for plugin settings interface",
  },
  
  zh: {
    generalSettings: "一般设置",
    weeklyNoteSettings: "周记设置",
    advancedSettings: "高级设置",
    
    dailyNotesNotEnabled: "⚠️ 日记插件未启用",
    dailyNotesDescription: "日历最好与日记插件或周期笔记插件（可在社区插件目录中找到）配合使用。",
    weeklyNoteMigrationNote: "注意：周记设置正在迁移。建议您安装'Periodic Notes'插件以在未来保持此功能。",
    
    wordsPerDot: "英文单词每圆点数",
    wordsPerDotDesc: "多少个英文单词应由一个圆点表示？",
    
    chineseCharsPerDot: "中文字符每圆点数",
    chineseCharsPerDotDesc: "中文信息熵约为英语的2.1倍，但您也可以自定义希望的数值",
    
    weekStart: "一周起始日：",
    weekStartDesc: "选择一周从哪一天开始。选择'地区默认'以使用moment.js指定的默认值",
    localeDefault: "地区默认",
    
    confirmCreate: "创建新笔记前确认",
    confirmCreateDesc: "创建新笔记前显示确认对话框",
    
    showWeekNumber: "显示周数",
    showWeekNumberDesc: "启用此项以添加显示周数的列",
    
    weeklyNoteFormat: "周记格式",
    weeklyNoteFormatDesc: "如需更多语法帮助，请参考格式参考",
    weeklyNoteTemplate: "周记模板",
    weeklyNoteTemplateDesc: "选择您想用作周记模板的文件",
    weeklyNoteFolder: "周记文件夹",
    weeklyNoteFolderDesc: "新建的周记将放置在此处",
    
    localeOverride: "日期显示语言：",
    localeOverrideDesc: "设置日历中日期显示的语言和格式",
    systemDefault: "跟随系统",
    
    language: "Language / 语言",
    languageDesc: "选择插件设置界面的语言",
  },
};

export function getTranslation(lang: Language): ITranslations {
  return translations[lang];
}
