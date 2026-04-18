import type { TFile } from "obsidian";
import { getDateFromFile, getDateUID } from "obsidian-daily-notes-interface";

export const classList = (obj: Record<string, boolean>): string[] => {
  return Object.entries(obj)
    .filter(([_k, v]) => !!v)
    .map(([k, _k]) => k);
};

export function clamp(
  num: number,
  lowerBound: number,
  upperBound: number
): number {
  return Math.min(Math.max(lowerBound, num), upperBound);
}

export function partition(
  arr: string[],
  predicate: (elem: string) => boolean
): [string[], string[]] {
  const pass = [];
  const fail = [];

  arr.forEach((elem) => {
    if (predicate(elem)) {
      pass.push(elem);
    } else {
      fail.push(elem);
    }
  });

  return [pass, fail];
}

/**
 * Lookup the dateUID for a given file. It compares the filename
 * to the daily and weekly note formats to find a match.
 *
 * @param file
 */
export function getDateUIDFromFile(file: TFile | null): string {
  if (!file) {
    return null;
  }

  // TODO: I'm not checking the path!
  let date = getDateFromFile(file, "day");
  if (date) {
    return getDateUID(date, "day");
  }

  date = getDateFromFile(file, "week");
  if (date) {
    return getDateUID(date, "week");
  }
  return null;
}

export function getWordCount(text: string): number {
  // 移除markdown链接和图像语法，避免干扰统计
  const cleanText = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 移除图片
                     .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')  // 保留链接文本
                     .replace(/#{1,6}\s/g, '')               // 移除标题标记
                     .replace(/[*_~`]/g, '')                 // 移除格式化标记
                     .replace(/^\s*[-*+]\s/gm, '')           // 移除列表标记
                     .replace(/^\s*\d+\.\s/gm, '');          // 移除有序列表标记

  // 匹配空格分隔的单词（英文、拉丁文等）
  const wordPattern = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+/g;
  const englishWords = (cleanText.match(wordPattern) || []).length;

  // 匹配中文字符（包括基本汉字和扩展汉字）
  const chinesePattern = /[\u4E00-\u9FFF\u3400-\u4DBF]/g;
  const chineseChars = (cleanText.match(chinesePattern) || []).length;

  // 匹配日文字符（平假名和片假名）
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF]/g;
  const japaneseChars = (cleanText.match(japanesePattern) || []).length;

  // 匹配韩文字符
  const koreanPattern = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g;
  const koreanChars = (cleanText.match(koreanPattern) || []).length;

  // 总数 = 英文单词数 + 中文字符数 + 日文字符数 + 韩文字符数
  return englishWords + chineseChars + japaneseChars + koreanChars;
}

export interface IWordCountDetail {
  englishWords: number;
  chineseChars: number;
  japaneseChars: number;
  koreanChars: number;
  total: number;
}

export function getWordCountDetail(text: string): IWordCountDetail {
  // 移除markdown链接和图像语法，避免干扰统计
  const cleanText = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 移除图片
                     .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')  // 保留链接文本
                     .replace(/#{1,6}\s/g, '')               // 移除标题标记
                     .replace(/[*_~`]/g, '')                 // 移除格式化标记
                     .replace(/^\s*[-*+]\s/gm, '')           // 移除列表标记
                     .replace(/^\s*\d+\.\s/gm, '');          // 移除有序列表标记

  // 匹配空格分隔的单词（英文、拉丁文等）
  const wordPattern = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+/g;
  const englishWords = (cleanText.match(wordPattern) || []).length;

  // 匹配中文字符（包括基本汉字和扩展汉字）
  const chinesePattern = /[\u4E00-\u9FFF\u3400-\u4DBF]/g;
  const chineseChars = (cleanText.match(chinesePattern) || []).length;

  // 匹配日文字符（平假名和片假名）
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF]/g;
  const japaneseChars = (cleanText.match(japanesePattern) || []).length;

  // 匹配韩文字符
  const koreanPattern = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g;
  const koreanChars = (cleanText.match(koreanPattern) || []).length;

  const total = englishWords + chineseChars + japaneseChars + koreanChars;

  return {
    englishWords,
    chineseChars,
    japaneseChars,
    koreanChars,
    total,
  };
}