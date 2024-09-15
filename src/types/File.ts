export interface File {
  name: string;
  fullPath: string;
}

export interface Directory extends File {
  children: Entry[];
}

export type Entry = File | Directory;
