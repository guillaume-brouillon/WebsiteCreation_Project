import { writable } from 'svelte/store';

export const user = writable(false);
export let courseID = writable('none');
export let allclasses = writable([]);

export class selector {
    CourseId = "";
    DesirabilityId = 0;
    StatusId = 0;
    ThisSemester = false;
    constructor() {
        
    }
  }
  export let Selector = writable(new selector());

export let trackID = writable('none');

export let Desirability = [
    { id: 0, text: "None" },
    { id: 1, text: "Lowest" },
    { id: 2, text: "Low" },
    { id: 3, text: "Normal" },
    { id: 4, text: "High" },
    { id: 5, text: "Higher" },
    { id: 6, text: "Highest" },
    { id: 7, text: "Must Take" },
    { id: 8, text: "Mandatory" },
  ];
 export let status = [
    { id: 0, text: "Not Taken" },
    { id: 1, text: "Asked" },
    { id: 2, text: "In Progress" },
    { id: 3, text: "Failed" },
    { id: 4, text: "Passed" },
  ];
