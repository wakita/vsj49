---
title: 'セッション'
---

::: {#main}

# 一般講演

# オーガナイズドセッション (OS)

<script type="text/x-template" id="x-organized-session-template">
  <div>
    <ul v-for="os in organized_sessions" :key="os.name">
      <li><!-- span class="os_id">{{os.name}}</span>: -->
          <span class="os_title">{{os.title}}</span><br/>
      オーガナイザ：<span class="os_organizer"
        v-for="(p, i) in os.organizers" :key="p[0]"
        >{{i > 0 ? '・' : ''}}{{p[0]}}（{{p[1]}}）</span>
      </li>
    </ul>
  </div>
</script>

<div id="list_of_organized_sessions"></div>
<script type="text/javascript" src="js/sessions.js"></script>

<!--
# ワークショップ (WS)
-->

:::
