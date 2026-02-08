---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2026, 2025, 2024, 2023, 2022]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->

Major publications are listed below; for a complete publication list, please visit my [Google Scholar profile](https://scholar.google.com/citations?user=QvBDUsIAAAAJ&hl=en).

<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
