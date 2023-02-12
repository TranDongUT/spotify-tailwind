import { createSlice, current } from "@reduxjs/toolkit";
import { dispatch } from "../store";
//type
import { song, songState } from "../../types/song";
//fake data
import SongsData from "../../data/songs.json";

const initialState: songState = {
  songs: SongsData || [],
  songSelected: null,
  isPlaying: false,
  isRandom: false,
  isLoading: false,
  isMute: false,
  isLoop: false,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    setSongSelected(state, action) {
      state.songSelected = action.payload;
      state.isPlaying = true;
      state.isLoading = true;
    },

    setTogglePlayingSong(state, action) {
      state.isPlaying = action.payload;
    },

    setToggleRandomSong(state, action) {
      state.isRandom = action.payload;
    },

    setToggleMute(state, action) {
      state.isMute = action.payload;
    },

    setToggleLoop(state, action) {
      state.isLoop = action.payload;
    },

    setNextSong(state, action) {
      state.songSelected = action.payload;
      state.isPlaying = true;
      state.isLoading = true;
    },

    setPrevSong(state, action) {
      state.songSelected = action.payload;
      state.isPlaying = true;
      state.isLoading = true;
    },
  },
});

export default songSlice.reducer;

export const selectSong = (song: song) => {
  return () => {
    dispatch(songSlice.actions.startLoading());
    dispatch(songSlice.actions.setSongSelected(song));
  };
};

export const togglePlayingSong = (isPlaying: boolean) => {
  return dispatch(songSlice.actions.setTogglePlayingSong(isPlaying));
};

export const toggleRandom = (isRandom: boolean) => {
  return dispatch(songSlice.actions.setToggleRandomSong(isRandom));
};

export const toggleMute = (isMute: boolean) => {
  return dispatch(songSlice.actions.setToggleMute(isMute));
};

export const toggleLoop = (isLoop: boolean) => {
  return dispatch(songSlice.actions.setToggleLoop(isLoop));
};

export const nextSong = (song: song) => {
  return dispatch(songSlice.actions.setNextSong(song));
};

export const prevSong = (song: song) => {
  return dispatch(songSlice.actions.setPrevSong(song));
};

export const endSongLoading = () => {
  return dispatch(songSlice.actions.endLoading());
};

export const startSongLoading = () => {
  return dispatch(songSlice.actions.startLoading());
};
