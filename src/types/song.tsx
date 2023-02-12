export type song = {
  name: string;
  author: string;
  url: string;
  id: string;
  links: any;
  index: number;
};

export type songState = {
  songs: song[] | any;
  songSelected: song | null;
  isPlaying: boolean;
  isRandom: boolean;
  isLoading: boolean;
  isMute: boolean;
  isLoop: boolean;
};
