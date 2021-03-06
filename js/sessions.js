
const organized_sessions = [{"name":"OS1","title":"ウェーブレットと知的可視化の応用","organizers":[["李鹿 輝","山形大学"],["章 忠","広島工業大学"],["田畑 隆英","鹿児島高専"]]},{"name":"OS2","title":"レーザ利用の可視化と計測(PIV, その他)","organizers":[["榊原 潤","明治大学"],["染矢 聡","産業技術総合研究所"],["細川 茂雄","関西大学"],["西野 耕一","横浜国立大学"]]},{"name":"OS3","title":"蛍光・燐光を用いた熱流体計測","organizers":[["染矢 聡","産業技術総合研究所"],["満尾 和徳","宇宙航空研究開発機構"],["森 英男","九州大学"]]},{"name":"OS4","title":"マイクロ・ナノ輸送現象の可視化","organizers":[["元祐 昌廣","東京理科大学"],["松田 佑","早稲田大学"],["山本 憲","大阪大学"]]},{"name":"OS5","title":"渦，はく離，後流の可視化","organizers":[["稲垣 歩","大分高専"],["渕脇 正樹","九工大"]]},{"name":"OS6","title":"超音波を用いた流体計測","organizers":[["木倉 宏成","東京工業大学"],["村川 英樹","神戸大学"],["古市 紀之","産業技術総合研究所"],["高橋秀治","東京工業大学"]]},{"name":"OS10","title":"生物・生体まわりの可視化","organizers":[["窪田 佳寛","東洋大学"],["菊地 謙次","東北大学"]]},{"name":"OS11","title":"サイエンティフィックアート＆スポーツ","organizers":[["伊藤 慎一郎","工学院大学"],["熊谷一郎","明星大学"],["瀬尾 和哉","山形大学"]]},{"name":"OS12","title":"ソーシャルデータの可視化","organizers":[["伊藤 貴之","お茶の水女子大学"],["美馬 秀樹","京都大学"]]},{"name":"OS13","title":"ビジュアルデータサイエンス","organizers":[["夏川 浩明","京都大学"],["小山田 耕二","京都大学"],["田中 覚","立命館大学"]]},{"name":"OS14","title":"心理情報","organizers":[["加藤 千恵子","東洋大学"],["川口 英夫","東洋大学"]]},{"name":"OS15","title":"人工知能と可視化","organizers":[["松岡 大祐","海洋研究開発機構"],["宮地英生","東京都市大学"]]},{"name":"OS16","title":"地球環境・災害の可視化","organizers":[["川原　慎太郎","海洋研究開発機構"]]},{"name":"OS17","title":"乱流および乱流遷移現象の可視化","organizers":[["長田 孝二","名古屋大学"],["後藤 晋","大阪大学"]]},{"name":"OS18","title":"医療に関わる可視化","organizers":[["山崎 享子","東洋大学"]]}];

window.organized_sessions = organized_sessions;

new Vue({
  el: '#list_of_organized_sessions',
  data: {
    organized_sessions: organized_sessions,
  },
  template: '#x-organized-session-template'
});
