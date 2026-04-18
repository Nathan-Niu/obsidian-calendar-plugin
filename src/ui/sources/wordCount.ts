import type { Moment } from "moment";
import type { TFile } from "obsidian";
import type { ICalendarSource, IDayMetadata, IDot } from "obsidian-calendar-ui";
import { getDailyNote, getWeeklyNote } from "obsidian-daily-notes-interface";
import { get } from "svelte/store";

import { DEFAULT_WORDS_PER_DOT, DEFAULT_CHINESE_CHARS_PER_DOT } from "src/constants";

import { dailyNotes, settings, weeklyNotes } from "../stores";
import { clamp, getWordCountDetail } from "../utils";

const NUM_MAX_DOTS = 5;

export async function getWordLengthAsDots(note: TFile): Promise<number> {
  const { 
    wordsPerDot = DEFAULT_WORDS_PER_DOT,
    chineseCharsPerDot = DEFAULT_CHINESE_CHARS_PER_DOT 
  } = get(settings);
  
  if (!note || (wordsPerDot <= 0 && chineseCharsPerDot <= 0)) {
    return 0;
  }
  
  const fileContents = await window.app.vault.cachedRead(note);
  const wordCountDetail = getWordCountDetail(fileContents);
  
  // 计算英文单词的圆点数
  const englishDots = wordsPerDot > 0 ? wordCountDetail.englishWords / wordsPerDot : 0;
  
  // 计算中文字符的圆点数
  const chineseDots = chineseCharsPerDot > 0 ? wordCountDetail.chineseChars / chineseCharsPerDot : 0;
  
  // 计算日文字符的圆点数（使用中文字符系数）
  const japaneseDots = chineseCharsPerDot > 0 ? wordCountDetail.japaneseChars / chineseCharsPerDot : 0;
  
  // 计算韩文字符的圆点数（使用中文字符系数）
  const koreanDots = chineseCharsPerDot > 0 ? wordCountDetail.koreanChars / chineseCharsPerDot : 0;
  
  // 总圆点数 = 英文圆点 + 中文圆点 + 日文圆点 + 韩文圆点
  const totalDots = englishDots + chineseDots + japaneseDots + koreanDots;
  
  return clamp(Math.floor(totalDots), 1, NUM_MAX_DOTS);
}

export async function getDotsForDailyNote(
  dailyNote: TFile | null
): Promise<IDot[]> {
  if (!dailyNote) {
    return [];
  }
  const numSolidDots = await getWordLengthAsDots(dailyNote);

  const dots = [];
  for (let i = 0; i < numSolidDots; i++) {
    dots.push({
      color: "default",
      isFilled: true,
    });
  }
  return dots;
}

export const wordCountSource: ICalendarSource = {
  getDailyMetadata: async (date: Moment): Promise<IDayMetadata> => {
    const file = getDailyNote(date, get(dailyNotes));
    const dots = await getDotsForDailyNote(file);
    return {
      dots,
    };
  },

  getWeeklyMetadata: async (date: Moment): Promise<IDayMetadata> => {
    const file = getWeeklyNote(date, get(weeklyNotes));
    const dots = await getDotsForDailyNote(file);

    return {
      dots,
    };
  },
};
