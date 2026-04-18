import { App, PluginSettingTab, Setting } from "obsidian";
import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import type { ILocaleOverride, IWeekStartOption } from "obsidian-calendar-ui";

import { DEFAULT_WEEK_FORMAT, DEFAULT_WORDS_PER_DOT, DEFAULT_CHINESE_CHARS_PER_DOT, DEFAULT_LANGUAGE } from "src/constants";
import { Language, getTranslation } from "./i18n";

import type CalendarPlugin from "./main";

export interface ISettings {
  language: Language;
  wordsPerDot: number;
  chineseCharsPerDot: number; // 中文字符每圆点数
  weekStart: IWeekStartOption;
  shouldConfirmBeforeCreate: boolean;

  // Weekly Note settings
  showWeeklyNote: boolean;
  weeklyNoteFormat: string;
  weeklyNoteTemplate: string;
  weeklyNoteFolder: string;

  localeOverride: ILocaleOverride;
}

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const defaultSettings = Object.freeze({
  language: DEFAULT_LANGUAGE,
  shouldConfirmBeforeCreate: true,
  weekStart: "locale" as IWeekStartOption,

  wordsPerDot: DEFAULT_WORDS_PER_DOT,
  chineseCharsPerDot: DEFAULT_CHINESE_CHARS_PER_DOT,

  showWeeklyNote: false,
  weeklyNoteFormat: "",
  weeklyNoteTemplate: "",
  weeklyNoteFolder: "",

  localeOverride: "system-default",
});

export function appHasPeriodicNotesPluginLoaded(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any>window.app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.weekly?.enabled;
}

export class CalendarSettingsTab extends PluginSettingTab {
  private plugin: CalendarPlugin;

  constructor(app: App, plugin: CalendarPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();

    const t = getTranslation(this.plugin.options.language);

    if (!appHasDailyNotesPluginLoaded()) {
      this.containerEl.createDiv("settings-banner", (banner) => {
        banner.createEl("h3", {
          text: t.dailyNotesNotEnabled,
        });
        banner.createEl("p", {
          cls: "setting-item-description",
          text: t.dailyNotesDescription,
        });
      });
    }

    this.containerEl.createEl("h3", {
      text: t.generalSettings,
    });
    this.addLanguageSetting();
    this.addDotThresholdSetting();
    this.addChineseCharThresholdSetting();
    this.addWeekStartSetting();
    this.addConfirmCreateSetting();
    this.addShowWeeklyNoteSetting();

    if (
      this.plugin.options.showWeeklyNote &&
      !appHasPeriodicNotesPluginLoaded()
    ) {
      this.containerEl.createEl("h3", {
        text: t.weeklyNoteSettings,
      });
      this.containerEl.createEl("p", {
        cls: "setting-item-description",
        text: t.weeklyNoteMigrationNote,
      });
      this.addWeeklyNoteFormatSetting();
      this.addWeeklyNoteTemplateSetting();
      this.addWeeklyNoteFolderSetting();
    }

    this.containerEl.createEl("h3", {
      text: t.advancedSettings,
    });
    this.addLocaleOverrideSetting();
  }

  addLanguageSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.language)
      .setDesc(t.languageDesc)
      .addDropdown((dropdown) => {
        dropdown.addOption('en', 'English');
        dropdown.addOption('zh', '中文');
        dropdown.setValue(this.plugin.options.language);
        dropdown.onChange(async (value) => {
          await this.plugin.writeOptions(() => ({
            language: value as Language,
          }));
          this.display();
        });
      });
  }

  addDotThresholdSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.wordsPerDot)
      .setDesc(t.wordsPerDotDesc)
      .addText((textfield) => {
        textfield.setPlaceholder(String(DEFAULT_WORDS_PER_DOT));
        textfield.inputEl.type = "number";
        textfield.setValue(String(this.plugin.options.wordsPerDot));
        textfield.onChange(async (value) => {
          this.plugin.writeOptions(() => ({
            wordsPerDot: value !== "" ? Number(value) : undefined,
          }));
        });
      });
  }

  addChineseCharThresholdSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.chineseCharsPerDot)
      .setDesc(t.chineseCharsPerDotDesc)
      .addText((textfield) => {
        textfield.setPlaceholder(String(DEFAULT_CHINESE_CHARS_PER_DOT));
        textfield.inputEl.type = "number";
        textfield.setValue(String(this.plugin.options.chineseCharsPerDot));
        textfield.onChange(async (value) => {
          this.plugin.writeOptions(() => ({
            chineseCharsPerDot: value !== "" ? Number(value) : undefined,
          }));
        });
      });
  }

  addWeekStartSetting(): void {
    const { moment } = window;
    const t = getTranslation(this.plugin.options.language);

    const localizedWeekdays = moment.weekdays();
    const localeWeekStartNum = window._bundledLocaleWeekSpec.dow;
    const localeWeekStart = moment.weekdays()[localeWeekStartNum];

    new Setting(this.containerEl)
      .setName(t.weekStart)
      .setDesc(t.weekStartDesc)
      .addDropdown((dropdown) => {
        dropdown.addOption("locale", `${t.localeDefault} (${localeWeekStart})`);
        localizedWeekdays.forEach((day, i) => {
          dropdown.addOption(weekdays[i], day);
        });
        dropdown.setValue(this.plugin.options.weekStart);
        dropdown.onChange(async (value) => {
          this.plugin.writeOptions(() => ({
            weekStart: value as IWeekStartOption,
          }));
        });
      });
  }

  addConfirmCreateSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.confirmCreate)
      .setDesc(t.confirmCreateDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.options.shouldConfirmBeforeCreate);
        toggle.onChange(async (value) => {
          this.plugin.writeOptions(() => ({
            shouldConfirmBeforeCreate: value,
          }));
        });
      });
  }

  addShowWeeklyNoteSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.showWeekNumber)
      .setDesc(t.showWeekNumberDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.options.showWeeklyNote);
        toggle.onChange(async (value) => {
          this.plugin.writeOptions(() => ({ showWeeklyNote: value }));
          this.display(); // show/hide weekly settings
        });
      });
  }

  addWeeklyNoteFormatSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.weeklyNoteFormat)
      .setDesc(t.weeklyNoteFormatDesc)
      .addText((textfield) => {
        textfield.setValue(this.plugin.options.weeklyNoteFormat);
        textfield.setPlaceholder(DEFAULT_WEEK_FORMAT);
        textfield.onChange(async (value) => {
          this.plugin.writeOptions(() => ({ weeklyNoteFormat: value }));
        });
      });
  }

  addWeeklyNoteTemplateSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.weeklyNoteTemplate)
      .setDesc(t.weeklyNoteTemplateDesc)
      .addText((textfield) => {
        textfield.setValue(this.plugin.options.weeklyNoteTemplate);
        textfield.onChange(async (value) => {
          this.plugin.writeOptions(() => ({ weeklyNoteTemplate: value }));
        });
      });
  }

  addWeeklyNoteFolderSetting(): void {
    const t = getTranslation(this.plugin.options.language);
    
    new Setting(this.containerEl)
      .setName(t.weeklyNoteFolder)
      .setDesc(t.weeklyNoteFolderDesc)
      .addText((textfield) => {
        textfield.setValue(this.plugin.options.weeklyNoteFolder);
        textfield.onChange(async (value) => {
          this.plugin.writeOptions(() => ({ weeklyNoteFolder: value }));
        });
      });
  }

  addLocaleOverrideSetting(): void {
    const { moment } = window;
    const t = getTranslation(this.plugin.options.language);

    const sysLocale = navigator.language?.toLowerCase();

    new Setting(this.containerEl)
      .setName(t.localeOverride)
      .setDesc(t.localeOverrideDesc)
      .addDropdown((dropdown) => {
        dropdown.addOption("system-default", `${t.systemDefault} (${sysLocale})`);
        moment.locales().forEach((locale) => {
          dropdown.addOption(locale, locale);
        });
        dropdown.setValue(this.plugin.options.localeOverride);
        dropdown.onChange(async (value) => {
          this.plugin.writeOptions(() => ({
            localeOverride: value as ILocaleOverride,
          }));
        });
      });
  }
}
