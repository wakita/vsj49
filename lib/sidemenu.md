<script src="https://kit.fontawesome.com/73e303f659.js" crossorigin="anonymous"></script>

::: {#sidemenu}

- [ホーム](index.html)
- [発表申込](submission.html)
- [原稿執筆要項](authoring.html)
- [参加登録など](registration.html)
- [講演時間](presentation.html)
- [セッション一覧](sessions.html)
- [アートコンテスト](art_contest.html)
- [学生プレゼン](studentaward.html)
- [企業出展](sponsors.html)
- [協賛](support.html)
<!--
- [プログラム](program.html)
- [アクセス・会場案内](access.html)
- [宿泊案内](hotel.html)
- [実行委員](committee.html)
-->
- [問い合わせ](index.html#contact)

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
            <img :src="'images/sponsors/' + sponsor.id + '.png'"></img>
          </template>
          <template v-else>{{sponsor.略称}}</template>
        </a>
      </template>
      <template v-else>
        <template v-if="sponsor['バナー']">
          <img :src="'images/sponsors/' + sponsor.id + '.png'"></img>
        </template>
        <template v-else>{{sponsor.略称}}</template>
      </template>
      <p class="info">
        <a :href="'sponsor_' + sponsor['id'] + '.html'">
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

<script src="js/sponsors.js"></script>

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
