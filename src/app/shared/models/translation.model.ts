import { User } from './user.model';

export interface Translation {
  id?: number;
  sourceLanguage: string;
  targetLanguage: string;
  originalText: string;
  translatedText: string;
  favorite: boolean;
  user: User;
}
