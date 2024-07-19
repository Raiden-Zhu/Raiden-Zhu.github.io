---
layout: page
permalink: /publications/
title: Publications
description: My current research focuses on examining the theoretical foundations of decentralized learning (or swarm learning). I am also dedicated to utilizing elegant theoretical insights to construct fast and generalizable decentralized learning algorithms. Please refer to my publicatios below.
years: [2024, 2023, 2022]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
