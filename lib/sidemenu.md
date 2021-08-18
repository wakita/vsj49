<script src="https://kit.fontawesome.com/73e303f659.js" crossorigin="anonymous"></script>

::: {#sidemenu}

- [ホーム](index.html)
- [発表申込](submission.html)
- [原稿執筆要項](authoring.html)
- [参加登録など](registration.html)
- [セッション一覧](sessions.html)
- [アートコンテスト](art_contest.html)
- [展示・広告](exhibition.html)
- [協賛](support.html)
<!--
- [プログラム](program.html)
- [講演時間](presen_style.html)
- [学生プレゼン](award.html)
- [アクセス・会場案内](access.html)
- [宿泊案内](hotel.html)
- [実行委員](committee.html)
-->
- [問い合わせ](index.html#contact)

::: {#sponsors}

<script type="text/x-template" id="x-sponsors-template">
  <ul id="sponsors">
    <p class="sponsor sponsor-header">協力企業<br/><span style="font-size: 10pt">
       <i class="fas fa-utensils"></i>: ランチョンセミナー<br/>
       <i class="fas fa-flask"></i>: 機器展示</span>
    </p>
    <div class="a_sponsor" v-for="sponsor in this.sorted()" :key="sponsor.id">
      <template v-if="sponsor['バナー']">
        <img :src="'images/sponsors/' + sponsor.id + '.png'"></img>
        <p class="sponsor-white" style="text-align: end;">
          <span v-if="sponsor['ランチョンセミナー']"><i class="fas fa-utensils"></i></span>
          <span v-if="sponsor['機器展示']"><i class="fas fa-flask"></i></span></span>
        </p>
      </template>
      <template v-else>
        <p class="sponsor">{{sponsor.略称}}
          <span v-if="sponsor['ランチョンセミナー']"><i class="fas fa-utensils"></i></span>
          <span v-if="sponsor['機器展示']"><i class="fas fa-flask"></i></span></span>
        </p>
      </template>
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
