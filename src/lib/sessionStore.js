import { writable } from 'svelte/store';

import { supabase } from "../supabaseClient";
export const user = writable(false);
export let courseID = writable('none');
export let allclasses = writable([]);

export class selector {
    CourseId = "";
    DesirabilityId = 0;
    StatusId = 0;
    ThisSemester = false;
    Desirability_compare_type = 2;
    constructor() {
        
    }
  }
  export let Selector = writable(new selector());

export let trackID = writable('none');

export let Desirability = [
    { id: 0, text: "Undefined" },
    { id: 1, text: "None" },
    { id: 2, text: "Lowest" },
    { id: 3, text: "Low" },
    { id: 4, text: "Normal" },
    { id: 5, text: "High" },
    { id: 6, text: "Higher" },
    { id: 7, text: "Highest" },
    { id: 8, text: "Must Take" },
    { id: 9, text: "Mandatory" },
  ];
  export let compare_type = [
    { id: 0, text: "<" },
    { id: 1, text: "=" },
    { id: 2, text: ">" }
  ];
 export let status = [
    { id: 0, text: "Not Taken" },
    { id: 1, text: "Asked" },
    { id: 2, text: "In Progress" },
    { id: 3, text: "Failed" },
    { id: 4, text: "Passed" },
  ];

  export   const ModifyTable = async (kv,courseId) => {
    let user = supabase.auth.user();
    if (courseId != "none" && user) {
      try {
        let { error, status } = await supabase
          .from("UserClassInfo")
          .select(`IdClass`)
          .match({ IdUser: user.id, IdClass: courseId })
          .single();
        if (status == 406) {
          kv.IdClass = courseId
          kv.IdUser = user.id
          await supabase
            .from("UserClassInfo")
            .insert([
              kv
            ]);
        }
        else{
          console.log(kv)
        await supabase
          .from("UserClassInfo")
          .update(kv)
          .match({ IdUser: user.id, IdClass: courseId })
          .single();
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };