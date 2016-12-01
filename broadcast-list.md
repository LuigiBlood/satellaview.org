---
layout: page
title : Broadcast List
permalink: /broadcast-list/
---

<table class="table table-hover table-mc-light-pink">
  <thead>
    <tr>
      <th data-sort-type="string">Title</th>
      <th data-sort-type="string">タイトル</th>
      <th data-sort-type="date">First Broadcast Date</th>
      <th data-sort-type="string">Category</th>
    </tr>
  </thead>
  <tbody>
    {% for post in site.posts %}
    {% capture post_categories %}{% for category in post.categories %}{{category | strip | slugify }} {% endfor %}{% endcapture %}
    <tr class="row" data-filter="{{post_categories | strip}}">
      <td class="title" data-title="Title">
        <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
      </td>
      <td class="title-jp" data-title="タイトル">
        <a href="{{ post.url }}" title="{{ post.title_jp }}">{{ post.title_jp }}</a>
      </td>
      <td class="date no-wrap" data-title="First Broadcast Date">
        {{ post.date | date: "%Y-%m-%d" }}
      </td>
      <td class="category no-wrap" data-title="Category">
        {{ post.category }}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
