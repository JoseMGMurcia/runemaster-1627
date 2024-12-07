import { Character } from '@shared/models/chartacter.model';

export const getJsonString = (characters: Character[]): string => {
  const seen: any = [];
  const text =JSON.stringify(characters, function(key, val) {
   if (val != null && typeof val == "object") {
        if (seen.indexOf(val) >= 0) {
            return;
        }
        seen.push(val);
    }
    return val;
  });
  return text;
};
