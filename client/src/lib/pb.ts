import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_PB_URL as string;
export const pb = new PocketBase(pbUrl);


//timeout, auth handling later