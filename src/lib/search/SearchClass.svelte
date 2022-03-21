<script>
    import {Selector,Desirability,status,compare_type} from "$lib/sessionStore";
    
  import {
    Dropdown,
    Toggle,
  } from "carbon-components-svelte";
  
  const ModifyTable = async (kv) => {
  }
let toggled = false;
</script>
  <div style="background-color: var(--bandeau-color);" class="flex m-auto ">
    <div class="BarAcceptClass flex content-center flex-wrap">
        

        <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText="Desirability"
        bind:selectedId={$Selector.Desirability_compare_type}
        items={compare_type}
        class="VerticalAligned"
        on:select={ModifyTable({ Desirability: $Selector.Desirability_compare_type })}
      />
      <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText=""
        bind:selectedId={$Selector.DesirabilityId}
        items={Desirability}
        class="VerticalAligned"
        on:select={ModifyTable({ Desirability: $Selector.DesirabilityId })}
      />

      <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText="Status"
        bind:selectedId={$Selector.StatusId}
        on:select={()=>{$Selector.ThisSemester = $Selector.StatusId < 2 ? toggled : false}}
        items={status}
        class="VerticalAligned"
        on:select={ModifyTable({ Status: $Selector.StatusId })}
      />

      <Toggle
        class="toggle { $Selector.StatusId < 2
          ?  $Selector.ThisSemester
            ? 'togglepaddingFull'
            : 'togglepaddingSmall'
          : 'togglepaddingNoToggle'} { $Selector.StatusId < 2 ? 'shown' : 'vishidden'}"
          bind:toggled
        on:toggle={()=>
        {
            $Selector.ThisSemester = toggled;
            console.log("toggled")
            console.debug($Selector.ThisSemester);
            console.log("__toggled")
            ModifyTable({ AddToTrimester: $Selector.ThisSemester });

        }
        }
        labelA="Choose this Trimester"
        labelB="Not choose this Trimester"
      />
    </div>
  </div>

  <style>
      
.BarAcceptClass {
    margin: auto;
    background-color: var(--bandeau-color);
    margin-left: auto;
    margin-right: auto;
  }
  
  :global(.toggle) {
    margin-top: -7px;
    margin-bottom: auto;
  }
  
  :global(.togglepaddingFull) {
    padding-right: 120px;
  }
  :global(.togglepaddingSmall) {
    padding-right: 100px;
  }
  :global(.togglepaddingNoToggle) {
    padding-right: 0px;
  }
  </style>