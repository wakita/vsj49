::: {#sidemenu}

- [HOME](index.html)
- [会長挨拶](pdf/President.pdf)
- [実行委員長挨拶](pdf/Chairman.pdf)
- [プログラム](__program__.html)
- [アートコンテスト](art_contest.html)
- [協賛学協会](support.html)
- [参加企業](sponsors/index.html)
- [実行委員会](committee.html)
- [使用方法](help.html)

::: {#sponsors}

<script type="text/x-template" id="x-sponsors-template">
  <ul id="sponsors">
    <p class="header">協力企業<br/><span style="font-size: small">
       <i class="fas fa-utensils"></i>: ランチョンセミナー<br/>
       <i class="fas fa-flask"></i>: 機器展示<br/>
       <i class="fas fa-book-open"></i>: カタログ<br/>
       <i class="fas fa-ad"></i>: 広告</span>
    </p>
    <div class="sponsor" v-for="sponsor in this.sorted()" :key="sponsor.id">
      <template v-if="sponsor['企業URL']">
        <a class="sponsor" :href="sponsor['企業URL']" target="_blank">
          <template v-if="sponsor['バナー']">
            <img :src="'/symp2021/images/sponsors/' + sponsor.id + '.png'"></img>
          </template>
          <template v-else>{{sponsor.略称}}</template>
        </a>
      </template>
      <template v-else>
        <template v-if="sponsor['バナー']">
          <img :src="'/symp2021/images/sponsors/' + sponsor.id + '.png'"></img>
        </template>
        <template v-else>{{sponsor.略称}}</template>
      </template>
      <p class="info">
        <a :href="'sponsors/' + sponsor['id'] + '.html'">
          <span v-if="sponsor['ランチョンセミナー']"><i class="fas fa-utensils"></i></span>
          <span v-if="sponsor['機器展示']"><i class="fas fa-flask"></i></span>
          <span v-if="sponsor['カタログ']"><i class="fas fa-book-open"></i></span>
          <span v-if="sponsor['広告']"><i class="fas fa-ad"></i></span>
        </a>
      </p>
    </div>
  </ul>
</script>

<div id="sponsors"></div>

<script src="/symp2021/js/sponsors.js"></script>

<script type="text/javascript">
sponsors.forEach((sponsor) => sponsor.kw = sponsor.kw * (1 + 0.05 * Math.random()))

console.log(sponsors);

new Vue({
  el: '#sponsors',
  data: {
    sponsors: sponsors
  },
  template: '#x-sponsors-template',
  methods: {
    sorted: function () {
      const data = [];
      this.sponsors.forEach((sponsor) => data.push(Object.assign({}, sponsor)))
      return data.sort((a, b) => b.kw - a.kw);
    }
  }
});
</script>

:::

:::
