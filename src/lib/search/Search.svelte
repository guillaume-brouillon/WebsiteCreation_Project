<script>
  import { supabase } from "../../supabaseClient";
  import { courseID } from '$lib/sessionStore.js'
  let input;
  let course = 'none';
  let message = '';

  const search = async (event) => {
    try {
      let user = supabase.auth.user();
      if (input && user) {
        let { data, error, status } = await supabase.from("ClassInformation").select(`ID_Cours`).or(`ID_Cours.eq.${input.toUpperCase()}`, `Name_of_Class.eq.${input}`).single();
        if (error && status !== 406) {
          throw error;
        }
        else if (data) {
          course = data.ID_Cours;
          message='';
        }
        else if (!data && status == 406) {
          message = `The course ${input} seems to not exist.`;
        }
        courseID.update(() => course)
        course = 'none'
      }
      if (!input && user) {
        course = 'none'
        courseID.update(() => course)
        message='Select a course';
      }
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
  }

</script>

<div class="relative m-6">
  <input type="text" class="bg-purple-white shadow rounded border-0 p-3 w-full" placeholder="Search course" bind:value="{input}">
  <div class="absolute pin-r pin-t mt-3 mr-4 top-0 right-0 text-purple-lighter cursor-pointer" on:click="{(event) => search(event)}">
  	<svg version="1.1" class="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	    viewBox="0 0 52.966 52.966" style="enable-background:new 0 0 52.966 52.966;" xml:space="preserve">
    	<path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"/>
	  </svg>
  </div>
  <div class="text-red-600 w-full text-center" id="message">{message}</div>
</div>