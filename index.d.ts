/// <reference types="node" />

export type I18nStringsFilesNoComment = Record<string, string>;
export interface I18nStringsWithCommentEntry {
  text: string;
  comment?: string;
}
export type I18nStringFileWithComment = Record<string, I18nStringsWithCommentEntry>;
export type I18nStringsFiles = I18nStringsFilesNoComment | I18nStringFileWithComment;

export interface ReadWriteOption {
  encoding?: string;
  wantsComments?: boolean;
}

export type CallbackFunc = (err: Error | null, data: I18nStringsFiles | null) => void;

export type OptionLike = ReadWriteOption | string | undefined | CallbackFunc;

export function convertBufferToString(buffer: Buffer, encoding?: string): string;

export function convertStringToBuffer(str: string, encoding?: string): Buffer;

export function compile(data: I18nStringsFiles, wantsComments?: boolean): string;

export function parse(input: string, wantsComments?: boolean): I18nStringsFiles;

export function readFile(file: string, options?: OptionLike, callback?: CallbackFunc);
export function readFileSync(file: string, options: OptionLike): I18nStringsFiles;

type WriteFileCallback = (err: Error | null) => void;
type WriteFileOptionLike = ReadWriteOption | WriteFileCallback;

export function writeFile(file: string, data: I18nStringsFiles, options?: WriteFileOptionLike, callback?: WriteFileCallback): void;
export function writeFileSync(file: string, data: I18nStringsFiles, options?: WriteFileOptionLike): void;

