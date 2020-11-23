<template>
  <div class="home">
    <CharacterCard name="123" imgUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg" />
    <CharacterCard name="123" imgUrl="https://starwars-visualguide.com/assets/img/characters/2.jpg" />
    <CharacterCard name="123" imgUrl="https://starwars-visualguide.com/assets/img/characters/3.jpg" />
    <CharacterCard name="123" imgUrl="https://starwars-visualguide.com/assets/img/characters/4.jpg" />
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCard from '@/components/CharacterCard'

export default {
  name: 'Home',
  components: {
    CharacterCard
  }
}
</script>

<style>
  .home{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
