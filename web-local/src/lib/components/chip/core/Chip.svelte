<!-- Chips have two areas:
  = left (icon) – used primarily for icons, action buttons, and small images
  - center (text) – used primarily for label information
-->
<script>
  import { slideRight } from "../../../transitions/index";
  import { createEventDispatcher } from "svelte";
  import RemoveChipButton from "./RemoveChipButton.svelte";
  import { defaultChipColors } from "../chip-types";

  export let removable = false;
  export let active = false;

  /** color elements elements */
  export let bgBaseColor = defaultChipColors.bgBaseColor;
  export let bgHoverColor = defaultChipColors.bgHoverColor;
  export let textColor = defaultChipColors.textColor;
  export let bgActiveColor = defaultChipColors.bgActiveColor;
  export let outlineColor = defaultChipColors.outlineColor;

  /** if removable is true, these props control the tooltip positioning */
  export let removeButtonTooltipLocation = "bottom";
  export let removeButtonTooltipAlignment = "start";
  export let removeButtonTooltipDistance = 12;

  /** the maximum width for the tooltip of the main chip */

  const dispatch = createEventDispatcher();
</script>

<div transition:slideRight|local={{ duration: 150 }}>
  <button
    on:click
    class="
    grid gap-x-2 items-center pl-2 pr-4 py-1 rounded-2xl cursor-pointer
    {textColor}
    {bgBaseColor}
    {outlineColor}
    hover:{bgHoverColor}
    {active ? bgActiveColor : ''}

  "
    class:outline-2={active}
    class:outline={active}
    style:grid-template-columns="{$$slots.icon || removable
      ? "max-content"
      : ""}
    {$$slots.body ? "max-content" : ""}"
  >
    <!-- a cancelable element, e.g. filter buttons -->
    {#if removable}
      <RemoveChipButton
        tooltipLocation={removeButtonTooltipLocation}
        tooltipAlignment={removeButtonTooltipAlignment}
        tooltipDistance={removeButtonTooltipDistance}
        on:remove
      >
        <svelte:fragment slot="remove-tooltip">
          {#if $$slots["remove-tooltip"]}
            <slot name="remove-tooltip" />
          {/if}
        </svelte:fragment>
      </RemoveChipButton>
    {:else if $$slots.icon}
      <!-- if there is a left icon, render it here -->
      <button
        on:click|stopPropagation={() => {
          dispatch("click-icon");
        }}
      >
        <slot name="icon" />
      </button>
    {/if}
    <!-- body -->
    {#if $$slots.body}
      <div>
        <slot name="body" />
      </div>
    {/if}
  </button>
</div>
