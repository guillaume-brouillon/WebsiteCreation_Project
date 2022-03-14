<script >
	export const prerender = true;
	import Header from "$lib/header/Header.svelte";
	import { supabase } from "../supabaseClient";

    //import { createForm } from "svelte-forms-lib";
    //import * as yup from "yup";

    import { TextInput, TextArea, Button, FormGroup, Form, InlineNotification } from "carbon-components-svelte";

    const validationSchema = yup.object().shape({
        name: yup.string().required('Please enter a name'),
        email: yup.string().email().required('Please enter a valid email'),
        message: yup.string().required('Please enter a message')
    });

    let apiResult = null;

    const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
        initialValues: { name: "", email: "", message: "" },
        validationSchema: validationSchema,
        onSubmit: async values => {

            try {
                var result = await supabase.from("ContactUs").insert(values);

                if (result.data != null) {
                    apiResult = true;
                } else {
                    apiResult = false;
                }

            } catch (ex) {
                apiResult = false;
            }

            handleReset();
      }
    });

</script>

<svelte:head>
	<title>About</title>
</svelte:head>
<Header />

<div class="page">
   <h1>Contact Us</h1>
    <!--<h2>Contact Us</h2>-->
    <br/>
    <p>Contact us by filling this form. We will reply to you as soon as possible.</p> <br/>

    {#if apiResult != null}

        {#if apiResult == true}
        <InlineNotification
            lowContrast
            kind="success"
            title="Success:"
            subtitle="Your message has been received"
        />
        {:else}
        <InlineNotification lowContrast kind="error"
            title="Error:"
            subtitle="An internal server error occurred."
        />

        {/if}    
    {/if}
    <Form on:submit={handleSubmit}>

        <FormGroup>
            <TextInput labelText="Name:" name="name" 
                on:change={handleChange} bind:value={$form.name}
                invalid={$errors.name.length > 0} invalidText={$errors.name}/>
        </FormGroup>

        <FormGroup>
            <TextInput labelText="Email:" name="email" type="email" 
                on:change={handleChange} bind:value={$form.email}
                invalid={$errors.email.length > 0} invalidText={$errors.email}/>
        </FormGroup>


        <FormGroup>
            <TextArea labelText="Message:" name="message" type="textarea"
                on:change={handleChange} bind:value={$form.message}
                invalid={$errors.message.length > 0} invalidText={$errors.message}/>
        </FormGroup>


        <Button type="submit" disabled={$isSubmitting}>Submit</Button>
    </Form>
</div>

<style>
    .page {
        margin: 40px;
    }
</style>

