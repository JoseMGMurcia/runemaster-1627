import { Character } from '@shared/models/chartacter.model'
import { Skill } from '@shared/models/skill.models';

export const getSkill = (name: string, pj: Character): Skill | undefined  =>{
  const skills = getAllSkill(pj);
  return skills.find((s) => s.name === name);
}

export const getAllSkill = (pj: Character): Skill[] => {
  return [
    ...pj.skills.AGILITY,
    ...pj.skills.COMUNICATION,
    ...pj.skills.MANIPULATION,
    ...pj.skills.STEALTH,
    ...pj.skills.KNOWLEDGE,
    ...pj.skills.PERCEPTION,
    ...pj.skills.MAGICAL,
    ...pj.skills.MELEE,
    ...pj.skills.RANGED,
    ...pj.skills.SHIELDS,
    ...pj.skills.NATURAL,
    ...pj.skills.OTHER,
  ];
}
