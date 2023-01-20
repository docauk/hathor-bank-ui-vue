<template>
  <div class="about">
    <h1>Hathor</h1>
    <h2>Goddess of Love, beauty, Joy and Amusement</h2>
    <!-- <div id="body"> -->
      <img alt="Hathor" src="@/assets/Hathor.png" width="200" height="400" />
      
    <p>
      Hathor was one of the forty-two state gods and goddesses of Egypt, and one of the most popular and powerful. She
      was goddess of many things: love, beauty, music, dancing, fertility, and pleasure. She was the protector of women,
      though men also worshipped her. She had priests as well as priestesses in her temples.

      Her center of worship was Dendera, and her veneration began early in Egypt?s history, possibly in the Predynastic
      Era. She was the daughter of Ra and was sometimes called ?The Eye of Ra? (a title shared with Bast and Sekhmet,
      among others) in her role as the sun god?s defender. As the wife of Horus, she was associated with the mother of
      the pharaoh in her role as Horus?s nurse, and also with the wife of the pharaoh in her role as Horus?s consort.

      In her role as goddess of beauty, she was the patron of cosmetics. Wearing cosmetics was seen as a form of worship
      to Hathor, and offerings of mirrors or cosmetic palettes to her were common. Every year, her statue would be
      carried in a boat to Edfu to be reunited with Horus. A festival celebrating their union would then begin.


    </p>
  <!-- </div> -->
    <a href="https://egyptianmuseum.org/deities-hathor">Egyptian Museum - Hathor</a>
    <a href="https://en.wikipedia.org/wiki/Hathor">Wikipedia - Hathor</a>
  </div>
</template>

<style scoped>
/* img,
p {
  display: inline-block;
}
img {
  float: right;
  height: 300px;
}
p {
  margin-left: 1rem;
} */
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

h1,
h2,
p,
a {
  margin: 10px;
  width: 75%
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

  }
}
</style>
