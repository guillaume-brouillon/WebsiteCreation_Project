import { writable } from 'svelte/store';

export const user = writable(false);
export let courseID = writable('none');
export let allclasses = writable([]);

export class selector {
    CourseId = "";
    constructor(hauteur, largeur) {
      this.hauteur = hauteur;
      this.largeur = largeur;
    }
  }


