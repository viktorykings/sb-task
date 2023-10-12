<script script lang="ts">
  let value: number = 1;
  let currency = "USD";
  let currencySec = "EUR";
  let currentCurrencyRate: number = 0.94;
  let currentCurrencyRate2: number;
  let rates: Identifier = {};
  $: res = Math.round(value * currentCurrencyRate * 100) / 100;

  interface Identifier {
    [key: string]: number;
  }
  function handleSelect(
    event: Event,
    rates: Identifier,
    curData: string,
  ) {
    const target = event.target as HTMLSelectElement;
    curData = target.value;
    currentCurrencyRate = rates[curData];
  }
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = parseInt(target.value);
  }
  import { onMount } from "svelte";
  onMount(async function () {
    const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
    const data = await response.json();
    console.log(data, data.rates);
    Object.assign(rates, data.rates);
  });
  async function getRandomNumber(curr: string) {
    const res = await fetch(`https://open.er-api.com/v6/latest/${curr}`);
    const data = await res.json();

    if (res.ok) {
      Object.assign(rates, data.rates);
      return data;
    } else {
      throw new Error(data);
    }
  }
  let promise = getRandomNumber("USD");
  console.log(promise);
</script>

{#await promise}
  <p>...waiting</p>
{:then data}
  <form>
    <select
      on:change={(e) => handleSelect(e, rates, currency)}
      value={currency}
    >
      {#each Object.keys(rates) as elem}
        <option value={elem}>
          {elem}
        </option>
      {/each}
    </select>

    <input type="number" on:input={handleInput} {value} />
  </form>
  <form
    on:change={(e) => handleSelect(e, rates, currency)}
  >
    <select bind:value={currencySec}>
      {#each Object.keys(rates) as elem}
        <option value={elem}>
          {elem}
        </option>
      {/each}
    </select>

    <input type="number" bind:value={res} />
  </form>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
