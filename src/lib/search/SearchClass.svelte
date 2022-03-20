<script>
    import {Selector,Desirability,status} from "$lib/sessionStore";
    
  import {
    Dropdown,
    Toggle,
  } from "carbon-components-svelte";
  
  const ModifyTable = async (kv) => {
  }
</script>
  <div style="background-color: var(--bandeau-color);" class="flex m-auto ">
    <div class="BarAcceptClass flex content-center flex-wrap">
      <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText="Desirability"
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
          toggled={$Selector.ThisSemester}
        on:toggle={ModifyTable({ AddToTrimester: $Selector.ThisSemester })}
        labelA="Choose this Trimester"
        labelB="Not choose this Trimester"
      />
    </div>
  </div>