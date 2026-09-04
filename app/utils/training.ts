export type TrainingMode = 'choice' | 'typing' | 'voice'
export type TrainingSubMode = 'initial' | 'standard' | 'explore' | 'mistakes' | 'reinforce'

export interface TrainingModeItem {
  id: TrainingMode;
  label: string;
  icon: string;
}

export interface TrainingSubModeItem {
  id: TrainingSubMode;
  label: string;
  activeColor: string;
  title: string;
  text: string;
  theme: string;
  theme2: string;
  textColor: string;
  icon: string;
}

export const TRAINING_MODES: Record<TrainingMode, TrainingModeItem> = {
  choice: { id: 'choice', label: 'training.mode.choice', icon: 'material-symbols:grid-view-rounded' },
  typing: { id: 'typing', label: 'training.mode.typing', icon: 'material-symbols:keyboard-alt-rounded' },
  voice: { id: 'voice', label: 'training.mode.voice', icon: 'material-symbols:mic-rounded' },
}

// export const TRAINING_SUB_MODES: Record<TrainingSubMode, { id: TrainingSubMode; label: string; activeColor: string }> = {
//   initial: { id: 'initial', label: 'Başlangıç', activeColor: 'text-purple-400'},
//   standard: { id: 'standard', label: 'Standart', activeColor: 'text-green-400' },
//   explore: { id: 'explore', label: 'Keşfet', activeColor: 'text-blue-400' },
//   mistakes: { id: 'mistakes', label: 'Sık Hata Yapılanlar', activeColor: 'text-red-400' },
//   reinforce: { id: 'reinforce', label: 'Pekiştir', activeColor: 'text-orange-400' },
// }

export const TRAINING_SUB_MODES: Record<TrainingSubMode, TrainingSubModeItem> = {
  initial: {
    id: 'initial',
    label: 'training.submode.initial',
    activeColor: 'text-lime-400',
    title: 'training.submode.initial.title',
    text: 'training.submode.initial.text',
    theme: 'card-gradient-lime',
    theme2: 'card-gradient-lime-solid',
    textColor: 'text-lime-700/80',
    icon: 'lucide:rocket',
  },
  standard: {
    id: 'standard',
    label: 'training.submode.standard',
    activeColor: 'text-blue-500/80',
    title: 'training.submode.standard.title',
    text: 'training.submode.standard.text',
    theme: 'card-gradient-blue',
    theme2: 'card-gradient-blue-solid',
    textColor: 'text-blue-500/80',
    icon: 'lucide:book-open',
  },
  explore: {
    id: 'explore',
    label: 'training.submode.explore',
    activeColor: 'text-green-700/80',
    title: 'training.submode.explore.title',
    text: 'training.submode.explore.text',
    theme: 'card-gradient-green',
    theme2: 'card-gradient-green-solid',
    textColor: 'text-green-700/80',
    icon: 'lucide:sparkles',
  },
  mistakes: {
    id: 'mistakes',
    label: 'training.submode.mistakes',
    activeColor: 'text-red-500/80',
    title: 'training.submode.mistakes.title',
    text: 'training.submode.mistakes.text',
    theme: 'card-gradient-red',
    theme2: 'card-gradient-red-solid',
    textColor: 'text-red-500/80',
    icon: 'lucide:badge-alert',
  },
  reinforce: {
    id: 'reinforce',
    label: 'training.submode.reinforce',
    activeColor: 'text-orange-500/80',
    title: 'training.submode.reinforce.title',
    text: 'training.submode.reinforce.text',
    theme: 'card-gradient-orange',
    theme2: 'card-gradient-orange-solid',
    textColor: 'text-orange-500/80',
    icon: 'lucide:brain',
  },
}