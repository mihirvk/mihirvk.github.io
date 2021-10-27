---
layout: page
title: Projects
permalink: /projects/
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

I'll add details of other projects very soon!